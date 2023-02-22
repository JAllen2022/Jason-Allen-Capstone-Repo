from .db import db, environment, SCHEMA, add_prefix_for_prod

tag_tasks = db.Table(
    'tag_tasks',
    db.Model.metadata,
    db.Column('task_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), primary_key=True ),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True )
)

if environment == "production":
    tag_tasks.schema = SCHEMA
