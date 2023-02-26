from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Goal
from app.forms import GoalForm

goal_routes = Blueprint('goals', __name__)


@goal_routes.route('/')
@login_required
def goals():
    """
    Query for all goals and returns them in a dictionary of goal dictionaries key value pairs
    """
    yearly_goals = Goal.query.filter(Goal.time_frame == "year").all()
    monthly_goals = Goal.query.filter(Goal.time_frame == "month").all()
    weekly_goals = Goal.query.filter(Goal.time_frame == "week").all()
    other_goals = Goal.query.filter(Goal.time_frame == "other").all()

    return {'year': {goal.id:goal.to_dict() for goal in yearly_goals},
            'month': {goal.id:goal.to_dict() for goal in monthly_goals},
            'week': {goal.id:goal.to_dict() for goal in weekly_goals},
            'other':{goal.id:goal.to_dict() for goal in other_goals}
            }


@goal_routes.route('/<int:id>')
@login_required
def goal(id):
    """
    Query for a goal by id and returns that goal in a dictionary
    """
    goal = Goal.query.get(id)
    goal_dict= goal.to_dict()
    goal_dict["sub_goals"] = {goal.id:goal.to_dict() for goal in goals.children}
    return goal_dict


@goal_routes.route('', methods=["POST"])
@login_required
def add_goal():
    """
    Create a new goal and return the goal in a dictionary
    """

    form= GoalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("checking this input", current_user.id)
        goal=Goal(
            user_id=current_user.id,
            name=form.data["name"],
            parent_id= form.data["parent_id"] if form.data["parent_id"] else False,
            time_frame=form.data["time_frame"]
        )

        db.session.add(goal)
        db.session.commit()

        return goal.to_dict()

    if form.errors:
        return form.errors


@goal_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_goal(id):
    """
    Edit a goal and return the goal in a dictionary
    """
    goal = Goal.query.get(id)

    if not goal:
        return {"errors":"Goal not found"}, 404

    if not current_user.id == goal.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    form= GoalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        goal.name=form.data["name"]
        goal.description=form.data["description"]
        goal.start_date=form.data["start_date"]
        goal.end_date=form.data["end_date"]
        goal.accomplished=form.data["accomplished"]
        goal.priority=form.data["priority"]
        goal.parent_id=form.data["parent_id"]

        # Need to be able to add relationships once we have the other features added
        # task.goals.apppend=form.data["goals"]
        # task.notes.apppend=form.data["notes"]
        # task.tags.apppend=form.data["tags"]

        db.session.add(goal)
        db.session.commit()

        return goal.to_dict()

    if form.errors:
        return form.errors


@goal_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_goal(id):
    """
    Delete a goal and return a success message
    """
    goal = Goal.query.get(id)

    if not goal:
        return {"errors":"Goal not found"}, 404

    if not current_user.id == goal.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    db.session.delete(goal)
    db.session.commit()

    return {"message": "Delete successful"}
