from datetime import datetime, timedelta
import jwt
from auth.database import create_user
from aiohttp import web
import bcrypt
from uuid import uuid4, UUID
import json
from aiohttp_session import setup, get_session, session_middleware


JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20

async def login(request):
    post_data = await request.json()
    assert post_data == {'email': 'test@mail.ru', 'password': '123456'}

    # Проверить, есть ли такой пользователь.
    # Если пользователь существует и данные совпадают, вернуть токен
    # Если пользователя не существует или данные не совпадают, вернуть Response status 400

    return web.Response(status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })



async def registration(request):
    post_data: dict = await request.json()
    email: str = str(post_data['email'])
    password: str = str(post_data['password'])

    # Хешируем пароль
    hashed: bytes = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    hash_password: str = hashed.decode()

    # Создаем token для аутентификации
    token: UUID = uuid4()
    # await create_user(post_data)

    response_body: dict = {"hello": "wo"}
    response = web.json_response(
        data=response_body,
        status=200,
        content_type='application/json',
        dumps=json.dumps)
    response.set_cookie(name='Token', value=str(token))
    return response
# 
# async def test(request):
#     print('test', request.__dict__)
#     response_body: dict = {"hello": "wo"}
#     response = web.json_response(text=json.dumps(response_body), status=200, content_type='application/json', dumps=json.dumps)
#     response.set_cookie(name='TestFromTest', value='Oooo')
#     return response
