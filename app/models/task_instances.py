from .db import db, add_prefix_for_prod, SCHEMA, environment

class TaskInstance(db.Model):
    __tablename__ = "task_instances"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), nullable=False)
    year=db.Column(db.String(50))
    month = db.Column(db.String(50))
    week = db.Column(db.String(50))
    due_date=db.Column(db.String(50))
    completed=db.Column(db.Boolean)


    task = db.relationship('Task', back_populates='task_instances')

    def to_dict(self):
        return {
            "id": self.id,
            "habit_id": self.task_id,
            "year":self.year,
            "month": self.month,
            "week": self.week,
            "due_date": self.due_date,
            "actually_completed":self.completed
        }
