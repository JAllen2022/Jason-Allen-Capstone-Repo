from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Goal
from app.forms import GoalForm

goal_routes = Blueprint('goals', __name__)


@goal_routes.route('')
@login_required
def goals():
    """
    Query for all goals for a given time period, given parameters, and returns them
    in a dictionary of goal dictionaries key value pairs
    """
    year = request.args.get("year")
    month = request.args.get("month")
    week = request.args.get("week")

    yearly_goals = Goal.query.filter(Goal.year == year, Goal.user_id==current_user.id).all()
    monthly_goals = Goal.query.filter(Goal.month == month, Goal.user_id==current_user.id).all()
    weekly_goals = Goal.query.filter(Goal.week == week, Goal.user_id==current_user.id).all()

    return {'year': {goal.id:goal.to_dict() for goal in yearly_goals},
            'month': {goal.id:goal.to_dict() for goal in monthly_goals},
            'week': {goal.id:goal.to_dict() for goal in weekly_goals}
            }

@goal_routes.route('/all')
@login_required
def all_goals():
    """
    Query for all goals for all goals, returns them in a object with key value pairs
    """

    all_goals = Goal.query.filter(Goal.user_id==current_user.id).all()

    return {'all_goals': {goal.id:goal.to_dict() for goal in all_goals }}

@goal_routes.route('/<int:id>')
@login_required
def goal(id):
    """
    Query for a goal by id and returns that goal in a dictionary
    """
    goal = Goal.query.get(id)

    goal_dict= goal.to_dict_single_goal()

    parentId=goal_dict["parent_id"]

    if parentId is not None:
        parent = Goal.query.get(parentId)
        goal_dict["parent"]=parent.to_dict()

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
        print("checking this input", form.data)
        goal=Goal(
            user_id=current_user.id,
            name=form.data["name"],
            parent_id= form.data["parent_id"] if form.data["parent_id"] else None,
            time_frame=form.data["time_frame"],
            year=form.data["year"],
            month=form.data["month"],
            week=form.data["week"],
            due_date=form.data["due_date"],
            priority=form.data["priority"],
            status=form.data["status"]
        )

        db.session.add(goal)
        db.session.commit()

        goal_dict= goal.to_dict_single_goal()

        parentId=goal_dict["parent_id"]

        if parentId is not None:
            parent = Goal.query.get(parentId)
            goal_dict["parent"]=parent.to_dict()

        return goal_dict

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
        goal.completed=form.data["completed"]
        goal.time_frame=form.data["time_frame"]
        goal.status=form.data["status"]
        goal.priority=form.data["priority"]
        if form.data["year"] is not None:
            goal.year=form.data["year"]
        if form.data["month"] is not None:
            goal.month=form.data["month"]
        if form.data["week"] is not None:
            goal.week=form.data["week"]
        goal.priority=form.data["priority"]
        if form.data["parent_id"] is not None:
            goal.parent_id=form.data["parent_id"]
        if form.data["due_date"] is not None:
            goal.due_date=form.data["due_date"]


        db.session.add(goal)
        db.session.commit()

        goal_dict= goal.to_dict_single_goal()

        parentId=goal_dict["parent_id"]

        if parentId is not None:
            parent = Goal.query.get(parentId)
            goal_dict["parent"]=parent.to_dict()


        return goal_dict

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
