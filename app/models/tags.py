from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tag_goals import tag_goals
from .tag_tasks import tag_tasks

class Tag(db.Model):
    __tablename__="tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)

    tasks = db.relationship("Task", secondary=tag_tasks, back_populates="tags")
    goals = db.relationship("Goal", secondary=tag_goals, back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
