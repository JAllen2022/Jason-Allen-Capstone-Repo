from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Goal
from app.forms import TaskForm
import json

task_routes = Blueprint('tasks', __name__)


@task_routes.route('')
@login_required
def tasks():
    """
    Query for all tasks based on parameter date provided and returns them in a dictionary
    of task dictionaries key value pairs
    """
    due_date = request.args.get("due_date")

    tasks = Task.query.filter(Task.due_date==due_date, Task.user_id==current_user.id).all()

    return {'tasks': {task.id:task.to_dict() for task in tasks}}

@task_routes.route('/all')
@login_required
def all_tasks():
    """
    Query for all tasks and returns them in a dictionary of task dictionaries key value pairs
    """

    tasks = Task.query.filter(Task.user_id==current_user.id).all()

    return {'all_tasks': {task.id:task.to_dict() for task in tasks}}


@task_routes.route('/<int:id>')
@login_required
def task(id):
    """
    Query for a task by id and returns that task in a dictionary
    """
    task = Task.query.get(id)
    task_dict= task.to_dict()
    task_dict["sub_tasks"] = {task.id:task.to_dict() for task in task.children}
    parent_id = task_dict["parent_id"]
    if parent_id:
        parent = Task.query.get(parent_id)
        task_dict["parent"]=parent.to_dict()



    return task_dict


@task_routes.route('', methods=["POST"])
@login_required
def add_task():
    """
    Create a new task and return the task in a dictionary
    """

    data = request.data.decode('utf-8')
    form_data = json.loads(data)
    if form_data["name"] is None:
        return {"errors":"Name is required"}


    task=Task(
        user_id=current_user.id,
        name=form_data["name"],
        parent_id= form_data["parent_id"] if form_data.get("parent_id") else None,
        due_date =form_data["due_date"],
        priority = form_data["priority"]
    )

    if form_data.get("goals") is not None:
        for goal_id in form_data["goals"]:
            goal=Goal.query.get(goal_id)
            task.goals.append(goal)

    db.session.add(task)
    db.session.commit()

    task_dict=task.to_dict()

    parentId = task.parent_id
    if parentId is not None:
        parent = Task.query.get(parentId)
        task_dict["parent"]=parent.to_dict()

    return task_dict



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

    data = request.data.decode('utf-8')
    form_data = json.loads(data)
    if form_data["name"] is None:
        return {"errors":"Name is required"}

    task.name=form_data["name"]
    task.description=form_data["description"]
    task.priority=form_data["priority"]
    task.task_duration=form_data["task_duration"]
    task.due_date=form_data["due_date"]
    task.assign_date=form_data["assign_date"]
    task.recurring_frequency=form_data["recurring_frequency"]
    task.recurring_date=form_data["recurring_date"]
    task.completed=form_data["completed"]

    goals=[]
    if form_data.get("goals") is not None:
        for goal_id in form_data["goals"]:
            goal=Goal.query.get(goal_id)
            goals.append(goal)

    task.goals=goals

    db.session.add(task)
    db.session.commit()

    task_dict=task.to_dict()

    parentId = task.parent_id
    if parentId is not None:
        parent = Task.query.get(parentId)
        task_dict["parent"]=parent.to_dict()


    return task_dict



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
