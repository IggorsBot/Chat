from datetime import datetime, timedelta
import jwt
from auth_database import create_user
from aiohttp import web

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20

async def login(request):
    post_data = await request.post()

    try:
        user = get_user(email=post_data['email'])
        # user.match_password(post_data['password'])
    except (User.DoesNotExist, User.PasswordDoesNotMatch):
        return json_response({'message': 'Wrong credentials'}, status=400)

    payload = {
        'user_id': user.user_id,
        'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return json_response({'token': jwt_token.decode('utf-8')})


async def registration(request):
    post_data = await request.json()
    print(post_data['email'])
    assert post_data == {'email':"test@mail.ru", 'password':"123456"}

    await create_user(post_data)

    return web.Response(status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })
