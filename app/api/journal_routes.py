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

    year = str(request.args.get("year"))
    week = request.args.get("week")
    reflection = Reflection.query.filter(Reflection.year == year,Reflection.week == week, Reflection.user_id == current_user.id).all()

    if not reflection:
        return {"not_found":"No instance found"}

    reflectionItem = reflection[0]

    if not current_user.id == reflectionItem.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    return reflectionItem.to_dict()


@reflection_routes.route('', methods=["POST", "PUT"])
@login_required
def create_reflection():


    form = ReflectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("we are here 1")

    if form.validate_on_submit():
        print("we are here 2")
        year = str(form.data["year"])
        week = form.data["week"]
        print("we are here 3", year, type(year))



        reflection = Reflection.query.filter(Reflection.year == year,Reflection.week == week, Reflection.user_id == current_user.id).all()


        # Handles the POST request. Will create an instance if none exists
        if not reflection:
            print("we are here 5")

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
            print("we are here 6")
            return reflection.to_dict()

        print("we are here 7")

        reflectionItem = reflection[0]
        print("we are here 4")
        # Handles the PUT request. Will update the existing instance
        reflectionItem.text_field1= form.data["text_field1"]
        reflectionItem.text_field2= form.data["text_field2"]
        reflectionItem.text_field3= form.data["text_field3"]
        reflectionItem.text_field4= form.data["text_field4"]
        reflectionItem.text_field5= form.data["text_field5"]
        reflectionItem.text_field6= form.data["text_field6"]
        reflectionItem.text_field7= form.data["text_field7"]
        reflectionItem.week_rating= form.data["week_rating"]

        db.session.add(reflectionItem)
        db.session.commit()

        return reflectionItem.to_dict()
    # Errors for form validations happen here
    else:
        return {'errors': form.errors}, 400
