from datetime import datetime, timedelta
from auth.database import create_user, get_user_from_email, get_user_from_token
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

    # Создаем token для аутентификации’s being prepared. For this aiohttp.web provides signals.
    token: UUID = uuid4()

    # Создаем уникальный id, по которому можно искать пользователей
    person_id: UUID = int(str(uuid4().int)[0:8])

    try:
        await create_user(person_id, email, hash_password, token)
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


async def logout(request) -> web.json_response:
    response = web.json_response(
        status=200
    )
    response.del_cookie(name='Token')
    return response


async def get_user(request) -> web.json_response:
    # Если пользователь не авторизован
    # Отправляем сообщение об ошибке (Invalid token)
    if 'Token' not in request.cookies:
        return web.json_response(
            status=400,
            data={"message": "Invalid token"},
            content_type="application/json",
            dumps=json.dumps)

    token: UUID = request.cookies['Token']
    user: dict = await get_user_from_token(token)

    # Нам нужна только информация о пользователе
    del user['token']
    del user['password']

    return web.json_response(
        status=200,
        data=user,
        content_type="application/json",
        dumps=json.dumps)
