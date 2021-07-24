"""empty message

Revision ID: 1a79047abb9a
Revises: dcfa4d3bf259
Create Date: 2021-07-24 01:37:09.372108

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a79047abb9a'
down_revision = 'dcfa4d3bf259'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Repositories',
    sa.Column('lang', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('link', sa.String(), nullable=True),
    sa.Column('watchers', sa.Integer(), nullable=True),
    sa.Column('forks', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('lang')
    )
    op.drop_table('repository')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('repository',
    sa.Column('lang', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('link', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('watchers', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('forks', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('lang', name='repository_pkey')
    )
    op.drop_table('Repositories')
    # ### end Alembic commands ###