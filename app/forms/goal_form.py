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
    time_frame=StringField("Time frame")
    parent_id=IntegerField("ParentId",default=None, validators=[Optional(), NumberRange(min=0)])
    priority=StringField("Priority")
    completed=BooleanField("Completed", default=False)
