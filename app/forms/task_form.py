from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    name= StringField("Name", validators=[DataRequired()])
    description = StringField("Description")
    priority = StringField("Priority")
    task_duration = StringField("Task duration")
    due_date=StringField("Due date")
    goal_id=StringField("Goal Id")
    parent_id=StringField("ParentId")
    assign_date=StringField("Due date")
    recurring_frequency=StringField("Recurring frequency")
    recurring_date=StringField("Recurring date")
    completed=BooleanField("Completed", default=False)
