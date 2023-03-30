from .db import db, add_prefix_for_prod, SCHEMA, environment
from sqlalchemy.sql import func
from sqlalchemy.orm import column_property
from .habit_instances import HabitInstance

class Habit(db.Model):
    __tablename__="habits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.Text, nullable=False)
    notes=db.Column(db.Text)

    # total_habit_goal = db.Column(db.Integer)
    # total_habit_completed = db.Column(db.Integer)

    habit_instances = db.relationship('HabitInstance', back_populates='habit', cascade='all, delete-orphan',
        passive_deletes=True)

    # Define column properties to calculate the total habit goal and completed values
    total_habit_goal = column_property(
        db.select([func.sum(HabitInstance.goal_to_complete)]).
        where(HabitInstance.habit_id == id).
        scalar_subquery(),
        deferred=True
    )

    # Deferred true = prevents subqueries from being executed automatically when querying habit table.
    # Instead - subqueries only executed when total habit goal or total habit completed is accessed
    total_habit_completed = column_property(
        db.select([func.sum(HabitInstance.actually_completed)]).
        where(HabitInstance.habit_id == id).
        scalar_subquery(), # tells SQLAlchemy to return a single value instead of a list of values
        deferred=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "total_habit_goal":self.total_habit_goal,
            "total_habit_completed":self.total_habit_completed,
            "habit_instances":{habit_instance.id:habit_instance.to_dict_for_habit() for habit_instance in self.habit_instances},
            "weeks_tracked":len(self.habit_instances)
        }

    def to_dict_for_instance(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "total_habit_goal":self.total_habit_goal,
            "total_habit_completed":self.total_habit_completed
        }
