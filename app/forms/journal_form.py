from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class JournalForm(FlaskForm):
    year = StringField("Year", validators=[DataRequired()])
    date = StringField("Day", validators=[DataRequired()])
    text_field1=StringField("Text field 1")
    text_field2=StringField("Text field 2")
    text_field3=StringField("Text field 3")
    text_field4=StringField("Text field 4")
    text_field5=StringField("Text field 5")
    text_field6=StringField("Text field 6")
