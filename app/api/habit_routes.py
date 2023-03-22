from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Goal
from app.forms import GoalForm

habit_routes = Blueprint('habits', __name__)

