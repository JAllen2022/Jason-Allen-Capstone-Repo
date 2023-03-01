from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, Optional, NumberRange

class GoalForm(FlaskForm):
    name= StringField("Name", validators=[DataRequired()])
    description = StringField("Description")
    year=StringField("Year", default=None)
    status=StringField('status')
    month = StringField("Month")
    week = StringField("Week")
    due_date = StringField("Due Date")
    time_frame=StringField("Time frame")
    parent_id=StringField("ParentId")
    priority=StringField("Priority")
    completed=BooleanField("Completed", default=False)
