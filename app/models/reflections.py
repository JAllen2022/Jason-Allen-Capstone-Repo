from .db import db, add_prefix_for_prod, SCHEMA, environment

class Reflection(db.Model):
    __tablename__="reflections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    year = db.Column(db.String(50), nullable=False)
    week = db.Column(db.String(50), nullable=False)
    text_field1 = db.Column(db.Text)
    text_field2 = db.Column(db.Text)
    text_field3 = db.Column(db.Text)
    text_field4 = db.Column(db.Text)
    text_field5 = db.Column(db.Text)
    text_field6 = db.Column(db.Text)
    text_field7= db.Column(db.Text)
    week_rating = db.Column(db.String(20))

    def to_dict(self):
        return {
            "id":self.id,
            "year":self.year,
            "month":self.month,
            "week":self.week,
            "text_field1":self.text_field1,
            "text_field2":self.text_field2,
            "text_field3":self.text_field3,
            "text_field4":self.text_field4,
            "text_field5":self.text_field5,
            "text_field6":self.text_field6,
            "text_field7":self.text_field7,
            "week_rating":self.week_rating,

        }
