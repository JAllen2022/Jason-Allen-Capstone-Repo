from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class GoalForm(FlaskForm):
    name= StringField("Name", validators=[DataRequired()])
    description = StringField("Description")
    start_date = StringField("Start date")
    end_date = StringField("End date")
    time_frame=StringField("Time frame")
    parent_id=IntegerField("ParentId")
    priority=StringField("Priority")
    completed=BooleanField("Completed", default=False)
