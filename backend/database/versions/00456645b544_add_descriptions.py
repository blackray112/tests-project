"""Add short description, long description, rename description to gpt_description

Revision ID: 00456645b544
Revises: 339a22e3f689
Create Date: 2023-06-27 14:17:26.792797

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = '00456645b544'
down_revision = '339a22e3f689'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('virtualfriend', sa.Column('short_description', sqlmodel.sql.sqltypes.AutoString(), nullable=False, server_default=''))
    op.add_column('virtualfriend', sa.Column('long_description', sqlmodel.sql.sqltypes.AutoString(), nullable=False, server_default=''))
    op.alter_column('virtualfriend', 'description', new_column_name='gpt_description')


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('virtualfriend', 'long_description')
    op.drop_column('virtualfriend', 'short_description')
    # ### end Alembic commands ###
    op.alter_column('virtualfriend', 'gpt_description', new_column_name='description')
