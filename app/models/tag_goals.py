from .db import db, environment, SCHEMA, add_prefix_for_prod

tag_goals = db.Table(
    'tag_goals',
    db.Model.metadata,
    db.Column('goal_id', db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')), primary_key=True ),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True )
)

if environment == "production":
    tag_goals.schema = SCHEMA
