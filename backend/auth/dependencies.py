from auth.router import fastapi_users

current_user = fastapi_users.current_user(active=True)
