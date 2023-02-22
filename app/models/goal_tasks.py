from .db import db, environment, SCHEMA, add_prefix_for_prod

goal_tasks = db.Table(
    'goal_tasks',
    db.Model.metadata,
    db.Column('goal_id', db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')), primary_key=True ),
    db.Column('task_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), primary_key=True )
)

if environment == "production":
    goal_tasks.schema = SCHEMA
