from .db import db, environment, SCHEMA, add_prefix_for_prod
from .goal_tasks import goal_tasks
from .tag_tasks import tag_tasks

class Task(db.Model):
    __tablename__="tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(30))
    task_duration = db.Column(db.String(75))
    due_date=db.Column(db.String(75))
    recurring_frequency=db.Column(db.String(30))
    completed=db.Column(db.Boolean)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))
    notes=db.Column(db.Text)
    # status=db.Column(db.String(30))

    children=db.relationship("Task", backref=db.backref('parent', remote_side=[id]))

    goals = db.relationship("Goal", secondary=goal_tasks, back_populates="tasks")
    tags = db.relationship("Tag", secondary=tag_tasks, back_populates="tasks")

    user = db.relationship("User", back_populates="tasks")

    task_instances = db.relationship("TaskInstance", back_populates="task")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "name": self.name,
            "description":self.description,
            "priority":self.priority,
            "task_duration":self.task_duration,
            "due_date": self.due_date,
            "recurring_frequency":self.recurring_frequency,
            "completed":self.completed,
            "parent_id":self.parent_id,
            "goals": {goal.id:goal.to_dict() for goal in self.goals},
            "notes": self.notes
        }
