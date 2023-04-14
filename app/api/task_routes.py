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


@task_routes.route('/week')
@login_required
def all_week_tasks():
    """
    Query for all tasks and returns them in a dictionary of task dictionaries key value pairs
    """
    mon = request.args.get("mon")
    tue = request.args.get("tue")
    wed = request.args.get("wed")
    thu = request.args.get("thu")
    fri = request.args.get("fri")
    sat = request.args.get("sat")
    sun = request.args.get("sun")


    tasks_mon = Task.query.filter(Task.due_date==mon, Task.user_id==current_user.id).all()
    tasks_tue = Task.query.filter(Task.due_date==tue, Task.user_id==current_user.id).all()
    tasks_wed = Task.query.filter(Task.due_date==wed, Task.user_id==current_user.id).all()
    tasks_thu = Task.query.filter(Task.due_date==thu, Task.user_id==current_user.id).all()
    tasks_fri = Task.query.filter(Task.due_date==fri, Task.user_id==current_user.id).all()
    tasks_sat = Task.query.filter(Task.due_date==sat, Task.user_id==current_user.id).all()
    tasks_sun = Task.query.filter(Task.due_date==sun, Task.user_id==current_user.id).all()


    return {'mon': {task.id:task.to_dict() for task in tasks_mon},
            'tue':{task.id:task.to_dict() for task in tasks_tue},
            'wed':{task.id:task.to_dict() for task in tasks_wed},
            'thu':{task.id:task.to_dict() for task in tasks_thu},
            'fri':{task.id:task.to_dict() for task in tasks_fri},
            'sat':{task.id:task.to_dict() for task in tasks_sat},
            'sun':{task.id:task.to_dict() for task in tasks_sun}
            }


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
        priority = form_data["priority"],
        description=""
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
    if form_data.get("parent_id"):
        task.parent_id = form_data["parent_id"]
    task.recurring_frequency=form_data["recurring_frequency"]  if form_data.get("recurring_frequency") else None
    task.recurring_date=form_data["recurring_date"] if form_data.get("recurring_date") else None
    task.completed=form_data["completed"]
    task.notes=form_data["notes"]


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
