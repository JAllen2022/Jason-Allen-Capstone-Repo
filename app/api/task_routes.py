from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Goal
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)


@task_routes.route('')
@login_required
def tasks():
    """
    Query for all tasks and returns them in a dictionary of task dictionaries key value pairs
    """
    due_date = request.args.get("due_date")

    tasks = Task.query.filter(Task.due_date==due_date, Task.user_id==current_user.id).all()
    # tasks = Task.query.order_by(Task.completed.desc()).all()

    # print("checking tasks", [task.id for task in tasks])
    # print("checking tasks unordered", [task.id for task in task_unordered])

    # print("checking this", {task.id:task.to_dict() for task in tasks})

    return {'tasks': {task.id:task.to_dict() for task in tasks}}


@task_routes.route('/<int:id>')
@login_required
def task(id):
    """
    Query for a task by id and returns that task in a dictionary
    """
    task = Task.query.get(id)
    task_dict= task.to_dict()
    task_dict["sub_tasks"] = {task.id:task.to_dict() for task in task.children}
    parentId = task.parent_id
    if parentId is not None:
        parent = Task.query.get(parentId)
        task_dict["parent"]=parent.to_dict()

    return task_dict


@task_routes.route('', methods=["POST"])
@login_required
def add_task():
    """
    Create a new task and return the task in a dictionary
    """

    form= TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data["goal_id"]:
        goal = Goal.query.get(form.data["goal_id"])



    if form.validate_on_submit():
        task=Task(
            user_id=current_user.id,
            name=form.data["name"],
            parent_id= form.data["parent_id"] if form.data["parent_id"] else None,
            due_date = form.data["due_date"]
        )

        if form.data["goal_id"]:
            task.goals.append(goal)

        db.session.add(task)
        db.session.commit()

        task_dict=task.to_dict()

        parentId = task.parent_id
        if parentId is not None:
            parent = Task.query.get(parentId)
            task_dict["parent"]=parent.to_dict()

        return task_dict

    if form.errors:
        return form.errors


@task_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_task(id):
    """
    Edit a task and return the task in a dictionary
    """
    task = Task.query.get(id)

    if not task:
        return {"errors":"Task not found"}, 404

    if not current_user.id == task.user_id:
        return {"errors":"User cannot authorized to edit task"}, 400

    form= TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task.name=form.data["name"]
        task.description=form.data["description"]
        task.priority=form.data["priority"]
        task.task_duration=form.data["task_duration"]
        task.due_date=form.data["due_date"]
        task.assign_date=form.data["assign_date"]
        task.recurring_frequency=form.data["recurring_frequency"]
        task.recurring_date=form.data["recurring_date"]
        task.completed=form.data["completed"]

        db.session.add(task)
        db.session.commit()

        task_dict=task.to_dict()

        parentId = task.parent_id
        if parentId is not None:
            parent = Task.query.get(parentId)
            task_dict["parent"]=parent.to_dict()


        return task_dict

    if form.errors:
        return form.errors


@task_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_task(id):
    """
    Delete a task and return a success message
    """
    task = Task.query.get(id)

    if not task:
        return {"errors":"Task not found"}, 404

    if not current_user.id == task.user_id:
        return {"errors":"User cannot authorized to edit task"}, 400

    db.session.delete(task)
    db.session.commit()

    return {"message": "Delete successful"}
