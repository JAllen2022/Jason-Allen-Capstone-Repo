from .db import db, add_prefix_for_prod, SCHEMA, environment
from .goal_tasks import goal_tasks
from .tag_goals import tag_goals

class Goal(db.Model):
    __tablename__="goals"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name= db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    time_frame=db.Column(db.String(30))
    year=db.Column(db.Integer)
    month=db.Column(db.String(30))
    week=db.Column(db.String(30))
    status=db.Column(db.String(30))
    completed=db.Column(db.Boolean)
    priority = db.Column(db.String(30))
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("goals.id")))

    children=db.relationship("Goal", backref=db.backref('parent', remote_side=[id]))

    tasks = db.relationship("Task", secondary=goal_tasks, back_populates="goals")
    tags = db.relationship("Tag", secondary=tag_goals, back_populates="goals")

    user = db.relationship("User", back_populates="goals")
    notes= db.relationship("Note", back_populates="goal", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "time_frame": self.time_frame,
            "year":self.year,
            "month":self.month,
            "week":self.week,
            "status":self.status,
            "completed": self.completed,
            "priority":self.priority,
            "parent_id":self.parent_id
        }
