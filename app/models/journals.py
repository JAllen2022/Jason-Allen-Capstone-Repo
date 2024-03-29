from .db import db, add_prefix_for_prod, SCHEMA, environment

class Journal(db.Model):
    __tablename__="journals"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    year = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    text_field1 = db.Column(db.Text)
    text_field2 = db.Column(db.Text)
    text_field3 = db.Column(db.Text)
    text_field4 = db.Column(db.Text)
    text_field5 = db.Column(db.Text)
    text_field6 = db.Column(db.Text)
    quote = db.Column(db.Text)
    author = db.Column(db.Text)

    images = db.relationship("Image", back_populates="journal")

    def to_dict(self):
        return {
            "journal":{
                "id":self.id,
                "year":self.year,
                "week":self.date,
                "text_field1":self.text_field1,
                "text_field2":self.text_field2,
                "text_field3":self.text_field3,
                "text_field4":self.text_field4,
                "text_field5":self.text_field5,
                "text_field6":self.text_field6,
                "text":self.quote,
                "author":self.author
            },
            "images":{
                image.id:image.to_dict() for image in self.images
            }

        }
