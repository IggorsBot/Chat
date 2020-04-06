from datetime import datetime, timedelta
from auth.database import create_user, get_user_from_email, refresh_token
from aiohttp import web
import bcrypt
from uuid import uuid4, UUID
import json
from aiohttp_session import setup, get_session, session_middleware
import psycopg2


async def login(request) -> web.json_response:
    # Получаем данные от клиента
    post_data: dict = await request.json()
    email: str = str(post_data['email'])
    password: str = str(post_data['password'])
    user: dict = await get_user_from_email(email)

    # Если email неверный, возвращаем клиенту сообщение  invalid email
    if not user:
        return web.json_response(
            status=400,
            data={"message": "Invalid email"},
            content_type='application/json',
            dumps=json.dumps)

    # Если пароль неверный, возвращаем клиенту сообщение  invalid password
    if not bcrypt.checkpw(password.encode(), user['password'].encode()):
        return web.json_response(
            status=400,
            data={"message": "Invalid password"},
            content_type='application/json',
            dumps=json.dumps)


    token: UUID = user['token']
    response = web.json_response(status=200)
    response.set_cookie(name='Token', value=str(token))
    return response


async def registration(request) -> web.json_response:
    # Получаем данные от клиента
    post_data: dict = await request.json()
    email: str = str(post_data['email'])
    password: str = str(post_data['password'])

    # Хешируем пароль
    hashed: bytes = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    hash_password: str = hashed.decode()

    # Создаем token для аутентификации
    token: UUID = uuid4()


    try:
        await create_user(email, hash_password, token)
    except psycopg2.IntegrityError as e:
        return web.json_response(
            status=400,
            data={"message": "User with email address already exist"},
            content_type='application/json',
            dumps=json.dumps)

    response = web.json_response(
        status=200,
        content_type='application/json',
        dumps=json.dumps)
    response.set_cookie(name='Token', value=str(token))
    return response
