from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Journal
from app.forms import JournalForm


journal_routes = Blueprint('journals', __name__)


@journal_routes.route('')
@login_required
def journals():
    """
    Qeury for journal and return it in a dictionary. If none found, still return 200. Just an instance not found dictionary
    """

    year = str(request.args.get("year"))
    date = request.args.get("date")
    journal = Journal.query.filter(Journal.year == year,Journal.date == date, Journal.user_id == current_user.id).all()

    if not journal:
        return {"not_found":"No instance found"}

    journalItem = journal[0]

    if not current_user.id == journalItem.user_id:
        return {"errors":"User cannot authorized to edit goal"}, 400

    return journalItem.to_dict()


@journal_routes.route('', methods=["POST", "PUT"])
@login_required
def create_journal():
    """
    Qeury for journal and return it in a dictionary. If none found, still return 200. Just an instance not found dictionary
    """

    form = JournalForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        year = str(form.data["year"])
        date = form.data["date"]



        journal = Journal.query.filter(Journal.year == year,Journal.date == date, Journal.user_id == current_user.id).all()


        # Handles the POST request. Will create an instance if none exists
        if not journal:

            journal = Journal(
                 user_id=current_user.id,
                 date=date,
                 year=year,
                 text_field1=form.data["text_field1"],
                 text_field2=form.data["text_field2"],
                 text_field3=form.data["text_field3"],
                 text_field4=form.data["text_field4"],
                 text_field5=form.data["text_field5"],
                 text_field6=form.data["text_field6"],
            )

            db.session.add(journal)
            db.session.commit()
            return journal.to_dict()


        journalItem = journal[0]
        # Handles the PUT request. Will update the existing instance
        journalItem.text_field1= form.data["text_field1"]
        journalItem.text_field2= form.data["text_field2"]
        journalItem.text_field3= form.data["text_field3"]
        journalItem.text_field4= form.data["text_field4"]
        journalItem.text_field5= form.data["text_field5"]
        journalItem.text_field6= form.data["text_field6"]

        db.session.add(journalItem)
        db.session.commit()

        return journalItem.to_dict()
    # Errors for form validations happen here
    else:
        return {'errors': form.errors}, 400
