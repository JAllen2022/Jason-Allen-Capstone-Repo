from .db import db, environment, SCHEMA, add_prefix_for_prod
from .goal_tasks import goal_tasks
from .tag_tasks import tag_tasks

class Task(db.Model):
    __tablename__="tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(30))
    task_duration = db.Column(db.String(30))
    assign_date=db.Column(db.String(30))
    due_date=db.Column(db.String(30))
    recurring_frequency=db.Column(db.String(30))
    recurring_date=db.Column(db.String(30))
    completed=db.Column(db.Boolean)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))

    children=db.relationship("Task", backref=db.backref('parent', remote_side=[id]))

    goals = db.relationship("Goal", secondary=goal_tasks, back_populates="tasks")
    tags = db.relationship("Tag", secondary=tag_tasks, back_populates="tasks")

    user = db.relationship("User", back_populates="tasks")
    notes= db.relationship("Note", back_populates="task", cascade="all, delete")


    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "name": self.name,
            "description":self.description,
            "priority":self.priority,
            "task_duration":self.task_duration,
            "assign_date":self.assign_date,
            "due_date": self.due_date,
            "recurring_frequency":self.recurring_frequency,
            "recurring_date":self.recurring_date,
            "completed":self.completed,
            "parent_id":self.parent_id
        }

    def to_dict_detailed(self):
        print("checking children", self.children, self.parent_id)
        return {
            "id":self.id,
            "user_id":self.user_id,
            "name": self.name,
            "description":self.description,
            "priority":self.priority,
            "task_duration":self.task_duration,
            "assign_date":self.assign_date,
            "due_date": self.due_date,
            "recurring_frequency":self.recurring_frequency,
            "recurring_date":self.recurring_date,
            "completed":self.completed,
            "parent_id":self.parent_id,
            "sub_tasks": {task.id:task for task in self.children}
        }
