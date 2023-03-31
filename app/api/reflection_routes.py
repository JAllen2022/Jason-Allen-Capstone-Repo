from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Reflection
from app.forms import ReflectionForm


reflection_routes = Blueprint('reflections', __name__)


@reflection_routes.route('')
@login_required
def reflections():
    """
    Qeury for reflection and return it in a dictionary. If none found, still return 200. Just an instance not found dictionary
    """

    year = request.args.get("year")
    week = request.args.get("week")
    reflection = Reflection.query.filter(Reflection.year == year,Reflection.week == week, Reflection.user_id == current_user.id).one()

    if not reflection:
        return {"not-found":"No instance found"}

    if not current_user.id == reflection.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    return {"reflection":reflection.to_dict()}


@reflection_routes.route('', methods=["POST, PUT"])
@login_required
def create_reflection():

    year = request.args.get("year")
    week = request.args.get("week")

    reflection = Reflection.query.filter(Reflection.year == year,Reflection.week == week, Reflection.user_id == current_user.id).one()

    form = Reflection()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Handles the POST request. Will create an instance if none exists
        if not reflection:
            reflection = Reflection(
                 user_id=current_user.id,
                 week=week,
                 year=year,
                 text_field1=form.data["text_field1"],
                 text_field2=form.data["text_field2"],
                 text_field3=form.data["text_field3"],
                 text_field4=form.data["text_field4"],
                 text_field5=form.data["text_field5"],
                 text_field6=form.data["text_field6"],
                 text_field7=form.data["text_field7"],
                 week_rating=form.data["week_rating"],
            )

            db.session.add(reflection)
            db.session.commit()

            return reflection.to_dict()

        # Handles the PUT request. Will update the existing instance
        reflection.text_field1= form.data["text_field1"]
        reflection.text_field2= form.data["text_field2"]
        reflection.text_field3= form.data["text_field3"]
        reflection.text_field4= form.data["text_field4"]
        reflection.text_field5= form.data["text_field5"]
        reflection.text_field6= form.data["text_field6"]
        reflection.text_field7= form.data["text_field7"]
        reflection.week_rating= form.data["week_rating"]

        db.session.add(reflection)
        db.session.commit()

        return reflection.to_dict()
    # Errors for form validations happen here
    else:
        return {'errors': form.errors}
