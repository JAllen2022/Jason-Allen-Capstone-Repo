from .db import db, add_prefix_for_prod, SCHEMA, environment

class Habit(db.Model):
    __tablename__="habits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50))
    weeks_repeat = db.Column(db.Integer)
    total_habit_goal = db.Column(db.Integer)
    total_habit_completed = db.Column(db.Integer)

    habit_instances = db.relationship('HabitInstance', back_populates='habit')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "weeks_repeat": self.weeks_repeat,
            "total_habit_goal":self.total_habit_goal,
            "total_habit_completed":self.total_habit_completed,
            "habit_instances":{habit_instance.id:habit_instance.to_dict_for_habit() for habit_instance in self.habit_instances}
        }

    def to_dict_for_instance(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "weeks_repeat": self.weeks_repeat,
            "total_habit_goal":self.total_habit_goal,
            "total_habit_completed":self.total_habit_completed
        }
