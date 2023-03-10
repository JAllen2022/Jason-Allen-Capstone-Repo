"""empty message

Revision ID: 01172c6a9c6f
Revises: 
Create Date: 2023-02-28 10:08:43.610710

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01172c6a9c6f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('time_frame', sa.String(length=30), nullable=True),
    sa.Column('year', sa.Integer(), nullable=True),
    sa.Column('month', sa.String(length=30), nullable=True),
    sa.Column('week', sa.String(length=30), nullable=True),
    sa.Column('due_date', sa.String(length=30), nullable=True),
    sa.Column('status', sa.String(length=30), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('priority', sa.String(length=30), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('priority', sa.String(length=30), nullable=True),
    sa.Column('task_duration', sa.String(length=30), nullable=True),
    sa.Column('assign_date', sa.String(length=30), nullable=True),
    sa.Column('due_date', sa.String(length=30), nullable=True),
    sa.Column('recurring_frequency', sa.String(length=30), nullable=True),
    sa.Column('recurring_date', sa.String(length=30), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['tasks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('goal_tasks',
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], ),
    sa.PrimaryKeyConstraint('goal_id', 'task_id')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('file_url', sa.String(length=255), nullable=True),
    sa.Column('goal_id', sa.Integer(), nullable=True),
    sa.Column('tasks_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['tasks_id'], ['tasks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag_goals',
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('goal_id', 'tag_id')
    )
    op.create_table('tag_tasks',
    sa.Column('task_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], ),
    sa.PrimaryKeyConstraint('task_id', 'tag_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tag_tasks')
    op.drop_table('tag_goals')
    op.drop_table('notes')
    op.drop_table('goal_tasks')
    op.drop_table('tasks')
    op.drop_table('goals')
    op.drop_table('users')
    op.drop_table('tags')
    # ### end Alembic commands ###
