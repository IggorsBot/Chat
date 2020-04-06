from aiohttp import web, WSMsgType
from chat.database import get_conversations
from auth.database import get_user_from_token
import json
import aiohttp_cors
from ast import literal_eval
from aiohttp_session import setup, get_session, session_middleware
from uuid import uuid4, UUID


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                msg_dict = literal_eval(msg.data)
                await create_message(msg_dict)

        elif msg.type == WSMsgType.ERROR:
            print('ws connection closed with exception %s' %
                  ws.exception())

    # print('websocket connection closed')
    return ws


async def get_messages(request):
    session = await get_session(request)
    chat_id = request.match_info.get('chat_id')
    chat_messages = await get_messages_from_db(chat_id)
    return web.Response(text=json.dumps(chat_messages), status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })

async def conversations(request) -> web.json_response:
    # Если пользователь не авторизован
    # Отправляем сообщение об ошибке (Invalid token)
    if 'Token' not in request.cookies:
        return web.json_response(
            status=400,
            data={"message": "Invalid token"},
            content_type="application/json",
            dumps=json.dumps)

    # Если пользователь авторизован
    # Находим его в БД
    # И возвращаем все его переписки (conversations)
    token: UUID = request.cookies['Token']
    user = await get_user_from_token(token)

    if not user:
        return web.json_response(
            status=400,
            data={"message": "Invalid token"},
            content_type="application/json",
            dumps=json.dumps)

    conversations = await get_conversations(user['user_id'])
    return web.json_response(
        status=200,
        data=conversations,
        content_type="application/json",
        dumps=json.dumps)


async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')
