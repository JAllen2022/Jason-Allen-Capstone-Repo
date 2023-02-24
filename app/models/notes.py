from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
    __tablename__="notes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    body = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    file_url = db.Column(db.String(255))

    goal_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("goals.id")))
    tasks_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tasks.id")))

    goal=db.relationship("Goal", back_populates="notes")
    task=db.relationship("Task", back_populates="notes")

    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name,
            "body":self.body,
            "image_url":self.image_url,
            "file_url":self.file_url
        }
