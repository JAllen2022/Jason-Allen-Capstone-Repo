from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class HabitForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    weeks_repeat = IntegerField('Weeks to Repeat')
    total_habit_goal = IntegerField('Total Habit Goal')
    habit_id = IntegerField("Habit id")
    goal_to_complete = IntegerField("Goal to complete")
    actually_completed = IntegerField("Actually completed")
    weeks_repeat = IntegerField("Weeks repeated")
    total_habit_goal = IntegerField("Total habit goal")
    total_habit_completed = IntegerField("Total habit goal")
    year = StringField("Year")
    month = StringField("Month")
    week = StringField("Week")

    submit = SubmitField('Create Habit')
