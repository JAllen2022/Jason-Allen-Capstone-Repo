from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class ReflectionForm(FlaskForm):
    year = StringField("Year", validators=[DataRequired()])
    week = StringField("Week", validators=[DataRequired()])
    text_field1=StringField("Text field 1")
    text_field2=StringField("Text field 2")
    text_field3=StringField("Text field 3")
    text_field4=StringField("Text field 4")
    text_field5=StringField("Text field 5")
    text_field6=StringField("Text field 6")
    text_field7=StringField("Text field 7")
    week_rating=StringField("Week rating")
