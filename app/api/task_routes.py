from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task
from app.forms import TaskForm

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/')
@login_required
def tasks():
    """
    Query for all tasks and returns them in a dictionary of task dictionaries key value pairs
    """
    tasks = Task.query.all()
    return {'tasks': {task.id:task.to_dict() for task in tasks}}


@task_routes.route('/<int:id>')
@login_required
def task(id):
    """
    Query for a task by id and returns that task in a dictionary
    """
    task = Task.query.get(id)
    return task.to_dict()


@task_routes.route('', methods=["POST"])
@login_required
def add_task():
    """
    Create a new task and return the task in a dictionary
    """

    form= TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        task=Task(
            user_id=current_user.id,
            name=form.data["name"],
        )

        db.session.add(task)
        db.session.commit()

        return task.to_dict()

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

    if not current_user.id == task.id:
        return {"errors":"User cannot authorized to edit task"}, 400

    form= TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task.name=form.data["name"],
        task.description=form.data["description"],
        task.priority=form.data["priority"],
        task.task_duration=form.data["task_duration"],
        task.due_date=form.data["due_date"],
        task.recurring_frequency=form.data["recurring_frequency"],
        task.recurring_date=form.data["recurring_date"],
        task.completed=form.data["completed"]
        # Need to be able to add relationships once we have the other features added
        # task.goals.apppend=form.data["goals"]
        # task.notes.apppend=form.data["notes"]
        # task.tags.apppend=form.data["tags"]

        db.session.add(task)
        db.session.commit()

        return task.to_dict()

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
