from .db import db, add_prefix_for_prod, SCHEMA, environment

class HabitInstance(db.Model):
    __tablename__ = "habit_instances"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('habits.id')), nullable=False)
    year = db.Column(db.String(50))
    month = db.Column(db.String(50))
    week = db.Column(db.String(50))
    goal_to_complete = db.Column(db.Integer)
    acutally_completed = db.Column(db.Integer)
    created_at = db.Column(db.Date)

    habit = db.relationship('Habit', back_populates='habit_instances')

    def to_dict(self):
        return {
            "id": self.id,
            "habit_id": self.habit_id,
            "year":self.year,
            "month": self.month,
            "week": self.week,
            "goal_to_complete": self.goal_to_complete,
            "actually_completed":self.acutally_completed,
            "habit":self.habit.to_dict_for_instance()
        }

    def to_dict_for_habit(self):
        return {
            "id": self.id,
            "habit_id": self.habit_id,
            "year":self.year,
            "month": self.month,
            "week": self.week,
            "goal_to_complete": self.goal_to_complete,
            "actually_completed":self.acutally_completed,
        }
