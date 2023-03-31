from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class ReflectionForm(FlaskForm):
    year = StringField("Year", validators=[DataRequired()])
    week = StringField("Week", validators=[DataRequired()])
    text_field1=TextAreaField("Text field 1")
    text_field2=TextAreaField("Text field 2")
    text_field3=TextAreaField("Text field 3")
    text_field4=TextAreaField("Text field 4")
    text_field5=TextAreaField("Text field 5")
    text_field6=TextAreaField("Text field 6")
    text_field7=TextAreaField("Text field 7")
    week_rating=TextAreaField("Week rating")
