from datetime import datetime, timedelta
import jwt
from auth.auth_database import create_user
from aiohttp import web

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20

async def login(request):
    post_data = await request.json()
    assert post_data == {'email': 'test@mail.ru', 'password': '123456'}

    # Проверить, есть ли такой пользователь.
    # Если пользователь существует и данные совпадают, вернуть токен
    # Если пользователя не существует или данные не совпадают, вернуть Response 400

    return web.Response(status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })



async def registration(request):
    post_data = await request.json()
    assert post_data == {'email':"test@mail.ru", 'password':"123456"}

    await create_user(post_data)

    return web.Response(status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })
