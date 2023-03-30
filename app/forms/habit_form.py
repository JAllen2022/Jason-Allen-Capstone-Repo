from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, NumberRange

class HabitForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    habit_id = StringField("Habit id")
    goal_to_complete = StringField("Goal to complete")
    actually_completed = StringField("Actually completed")
    total_habit_goal = StringField("Total habit goal")
    total_habit_completed = StringField("Total habit goal")
    year = StringField("Year")
    month = StringField("Month")
    week = StringField("Week")
    monday = BooleanField("Monday")
    tuesday = BooleanField("tuesday")
    wednesday = BooleanField("wednesday")
    thursday = BooleanField("thursday")
    friday = BooleanField("friday")
    saturday = BooleanField("saturday")
    sunday = BooleanField("sunday")
    submit = SubmitField('Create Habit')
