from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
import json


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_user(id):
    """
    Edit a user and then returns that user in a dictionary
    """


    user = User.query.get(id)

    if not current_user.id == user.id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    data = request.data.decode('utf-8')
    form_data = json.loads(data)

    user.username=form_data["username"]
    user.email=form_data["email"]
    user.task_filter=form_data["task_filter"]
    user.goal_year_filter=form_data["goal_year_filter"]
    user.goal_month_filter=form_data["goal_month_filter"]
    user.goal_week_filter=form_data["goal_week_filter"]

    db.session.add(user)
    db.session.commit()

    return user.to_dict()
