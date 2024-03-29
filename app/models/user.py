from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    task_filter=db.Column(db.String(255),default="alphabetical",nullable=False)
    goal_year_filter=db.Column(db.String(30),default="alphabetical", nullable=False)
    goal_month_filter=db.Column(db.String(30),default="alphabetical", nullable=False)
    goal_week_filter=db.Column(db.String(30),default="alphabetical", nullable=False)


    goals = db.relationship("Goal", back_populates="user")
    tasks = db.relationship("Task", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "goals": {goal.id:goal.to_dict() for goal in self.goals},
            "tasks": {task.id:task.to_dict() for task in self.tasks},
            "task_filter": self.task_filter,
            "goal_year_filter":self.goal_year_filter,
            "goal_month_filter":self.goal_month_filter,
            "goal_week_filter":self.goal_week_filter
        }
