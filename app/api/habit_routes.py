from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Habit, HabitInstance
from app.forms import HabitForm
import datetime

habit_routes = Blueprint('habits', __name__)

# GET ROUTES

# GET ALL HABITS FOR A GIVEN WEEK
@habit_routes.route('')
@login_required
def week_habits():
    """
    Query for all habits for the current week. Return in a dictionary of key value pairs
    """

    week = request.args.get("week")

    habit_instances = HabitInstance.query\
        .join(Habit)\
        .filter(Habit.user_id == current_user.id, HabitInstance.week == week)\
        .all()

    return {'habits':{habit_instance.id:habit_instance.to_dict() for habit_instance in habit_instances}}

# GET A SINGLE HABIT AND ALL INSTANCES
@habit_routes.route('/<int>:id')
@login_required
def habit(id):
    """
    Query for a habit for a given week. Return in a dictionary of key value pairs
    """

    habit = Habit.query.get(id)

    if not habit:
        return {"errors":"Habit not found"}, 404

    if not current_user.id == habit.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    return habit.to_dict()

# POST ROUTES

# CREATE A NEW HABIT AND INSTANCE
@habit_routes.route('', methods=['POST'])
@login_required
def create_habit():
    """
    Create a new habit and a corresponding habit instance for the current week
    """

    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        habit = Habit(
            user_id=current_user.id,
            name=form.data["name"],
            weeks_repeat=0,
            total_habit_goal=0,
            total_habit_completed=0
        )

        habit_instance = HabitInstance(
            habit_id=habit.id,
            year= form.data["year"],
            month=form.data["month"],
            week=form.data["week"],
            goal_to_complete=0,
            actually_completed=0,
            created_at=datetime.now()
        )

        db.session.add(habit)
        db.session.add(habit_instance)
        db.session.commit()
        return {'habit': habit.to_dict(), 'habit_instance': habit_instance.to_dict()}
    else:
        return {'errors': form.errors}

# CREATE ADDITIONAL INSTANCES. NOT HABITS
@habit_routes.route('/instances', methods=['POST'])
@login_required
def add_habit_instances():
    """
    Create habit instance(s) for a corresponding habit for additional weeks
    """

    habit = Habit.query.get(id)

    if not habit:
        return {"errors":"Habit not found"}, 404

    if not current_user.id == habit.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        habit.name=form.data["name"]
        habit.weeks_repeat=form.data["weeks_repeat"]

        habit_instance = HabitInstance(
            habit_id=habit.id,
            year= form.data["year"],
            month=form.data["month"],
            week=form.data["week"],
            goal_to_complete=0,
            actually_completed=0,
            created_at=datetime.now()
        )

        db.session.add(habit)
        db.session.add(habit_instance)
        db.session.commit()
        return {'habit': habit.to_dict(), 'habit_instance': habit_instance.to_dict()}
    else:
        return {'errors': form.errors}


# EDIT ROUTES

@habit_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_habit(id):
    """
    Edit the habit and habit instance
    """

    habit_instance = HabitInstance.query.get(id)

    if not habit_instance:
        return {"errors":"Habit not found"}, 404

    if not current_user.id == habit_instance.habit_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    habit = Habit.query.get(habit_instance.habit_id)

    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        habit.name = form.data["name"]
        habit.weeks_repeat = form.data["weeks_repeat"]
        habit.total_habit_goal += form.data["goal_to_complete"]
        habit.total_habit_completed += form.data["actually_completed"]


        habit_instance.year= form.data["year"]
        habit_instance.month=form.data["month"]
        habit_instance.week=form.data["week"]
        habit_instance.goal_to_complete=form.data["goal_to_complete"]
        habit_instance.actually_completed=form.data["actually_completed"]

        db.session.add(habit)
        db.session.add(habit_instance)
        db.session.commit()
        return {'habit': habit.to_dict(), 'habit_instance': habit_instance.to_dict()}
    else:
        return {'errors': form.errors}


# DELETE ROUTES

# DELETE HABIT AND INSTANCE
@habit_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_habit_and_instance(id):
    """
    Delete the habit and habit instance
    """

    habit_instance = HabitInstance.query.get(id)

    if not habit_instance:
        return {"errors":"Habit not found"}, 404

    if not current_user.id == habit_instance.habit_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    habit = Habit.query.get(habit_instance.habit_id)


    db.session.delete(habit)
    db.session.delete(habit_instance)
    db.session.commit()

    return {"message": "Delete successful"}

# DELETE ONLY INSTANCE
@habit_routes.route('/instance/<int:id>', methods=['DELETE'])
@login_required
def delete_habit_and_instance(id):
    """
    Delete the habit and habit instance
    """

    habit_instance = HabitInstance.query.get(id)

    if not habit_instance:
        return {"errors":"Habit not found"}, 404

    if not current_user.id == habit_instance.habit.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    db.session.delete(habit_instance)
    db.session.commit()

    return {"message": "Delete successful"}