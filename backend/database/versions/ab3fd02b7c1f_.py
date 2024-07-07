"""empty message

Revision ID: ab3fd02b7c1f
Revises: 2c83650b4b72
Create Date: 2023-07-09 15:57:23.313702

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = 'ab3fd02b7c1f'
down_revision = '2c83650b4b72'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('oauthaccount',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('oauth_name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('access_token', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('expires_at', sa.Integer(), nullable=True),
    sa.Column('refresh_token', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('account_id', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('account_email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.Column('modified', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_oauthaccount_account_id'), 'oauthaccount', ['account_id'], unique=False)
    op.create_index(op.f('ix_oauthaccount_oauth_name'), 'oauthaccount', ['oauth_name'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_oauthaccount_oauth_name'), table_name='oauthaccount')
    op.drop_index(op.f('ix_oauthaccount_account_id'), table_name='oauthaccount')
    op.drop_table('oauthaccount')
    # ### end Alembic commands ###