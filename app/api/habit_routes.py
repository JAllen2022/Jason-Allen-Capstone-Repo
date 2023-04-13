from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Habit, HabitInstance
from app.forms import HabitForm
import json
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

    habit_dict = {habit_instance.id:habit_instance.to_dict() for habit_instance in habit_instances}

    total_accomplished =0
    total_goal = 0
    for habit in habit_dict:
        total_goal += habit_dict[habit]["goal_to_complete"]
        total_accomplished += habit_dict[habit]["actually_completed"]
        print("checking count",habit_dict[habit]["id"],habit_dict[habit]["actually_completed"])


    return {'habits':habit_dict,
            "total_accomplished": total_accomplished,
            "total_goal": total_goal}

# GET A SINGLE HABIT AND ALL INSTANCES
@habit_routes.route('/<int:id>')
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

    habit_dict = habit.to_dict()

    return habit_dict

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
            total_habit_goal=0,
            total_habit_completed=0
        )

        db.session.add(habit)
        db.session.commit()


        habit_instance = HabitInstance(
            habit_id=habit.id,
            year= form.data["year"],
            month=form.data["month"],
            week=form.data["week"],
            monday=False,
            tuesday=False,
            wednesday=False,
            thursday=False,
            friday=False,
            saturday=False,
            sunday=False,
            goal_to_complete=0,
            actually_completed=0,
            created_at=datetime.datetime.now()
        )

        db.session.add(habit_instance)
        db.session.commit()
        return habit_instance.to_dict()
    else:
        return {'errors': form.errors}

# CREATE ADDITIONAL INSTANCES. NOT HABITS
@habit_routes.route('/<int:id>/instances', methods=['POST'])
@login_required
def add_habit_instances(id):
    """
    Create habit instance(s) for an existing habit instance for additional weeks.
    Essentially we're copying one instance over several weeks.
    """

    OG_habit_instance = HabitInstance.query.get(id)

    if not OG_habit_instance:
        return {"errors":"Habit instance not found"}, 404

    if not current_user.id == OG_habit_instance.habit.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400
    print("aeehjkljklhlhljklhjklkhjkl")
    habit = Habit.query.get(OG_habit_instance.habit_id)
    data = request.data.decode('utf-8')
    form_data = json.loads(data)
    dates = form_data["dates"]
    # print("checking dates", form_data)
    # print("checking data", dates)
    for year,month,week in dates:
         habit_instance = HabitInstance(
            habit_id=habit.id,
            year= year,
            month=month,
            week=week,
            monday=False,
            tuesday=False,
            wednesday=False,
            thursday=False,
            friday=False,
            saturday=False,
            sunday=False,
            goal_to_complete=OG_habit_instance.goal_to_complete,
            actually_completed=0,
            created_at=datetime.datetime.now()
        )

         habit.habit_instances.append(habit_instance)

    db.session.add(habit)
    db.session.commit()

    return habit.to_dict()


# EDIT ROUTES

@habit_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_habit(id):
    """
    Edit the habit and habit instance
    """

    habit_instance = HabitInstance.query.get(id)

    if not habit_instance:
        return {"errors":"Habit instance not found"}, 404

    if not current_user.id == habit_instance.habit.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    habit = Habit.query.get(habit_instance.habit_id)

    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        habit.name = form.data["name"]
        habit.notes=form.data["notes"]


        g_diff = form.data["goal_to_complete"] if form.data["goal_to_complete"] else 0
        a_diff = form.data["actually_completed"] if form.data["actually_completed"] else 0
        goal_difference = int(habit_instance.goal_to_complete)-g_diff
        accomplished_difference  = habit_instance.actually_completed-a_diff

        habit_instance.year= form.data["year"]
        habit_instance.month=form.data["month"]
        habit_instance.week=form.data["week"]
        habit_instance.goal_to_complete=form.data["goal_to_complete"]
        habit_instance.actually_completed=form.data["actually_completed"]
        habit_instance.monday=form.data["monday"]
        habit_instance.tuesday=form.data["tuesday"]
        habit_instance.wednesday=form.data["wednesday"]
        habit_instance.thursday=form.data["thursday"]
        habit_instance.friday=form.data["friday"]
        habit_instance.saturday=form.data["saturday"]
        habit_instance.sunday=form.data["sunday"]


        db.session.add(habit)
        db.session.add(habit_instance)
        db.session.commit()


        return {'habit': habit.to_dict(),
            'habit_instance': habit_instance.to_dict(),
            "accomplished_difference":accomplished_difference,
            "goal_difference":goal_difference}
    else:
        return {'errors': form.errors}


# DELETE ROUTES

# DELETE HABIT AND INSTANCE
@habit_routes.route('/<int:id>/<string:option>', methods=['DELETE'])
@login_required
def delete_habit_and_instance(id, option):
    """
    Delete the habit and habit instance
    """

    if option=="all":
        habit = Habit.query.get(id)

        if not habit:
            return {"errors":"Habit not found"}, 404

        if not current_user.id == habit.user_id:
            return {"errors":"User cannot authorized to edit goal"}, 400

        db.session.delete(habit)
    elif option=="single":
        habit_instance = HabitInstance.query.get(id)

        if not habit_instance:
            return {"errors":"Habit not found"}, 404

        if not current_user.id == habit_instance.habit.user_id:
            return {"errors":"User cannot authorized to edit goal"}, 400

        db.session.delete(habit_instance)

    db.session.commit()

    return {"message": "Delete successful"}

# DELETE ONLY INSTANCE
@habit_routes.route('/instance/<int:id>', methods=['DELETE'])
@login_required
def delete_instance(id):
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
