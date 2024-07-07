from sqladmin import ModelView

from users.models import User


class UserAdminView(ModelView, model=User):
    column_list = '__all__'
