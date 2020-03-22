from aiohttp import web, WSMsgType
from chat.database import create_message, get_messages_from_db
import json
import aiohttp_cors
from ast import literal_eval

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

    print('websocket connection closed')
    return ws


async def get_messages(request):
    chat_id = request.match_info.get('chat_id')
    chat_messages = await get_messages_from_db(chat_id)
    return web.Response(text=json.dumps(chat_messages), status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })

async def conversations(request):
    post_data = await request.json()
    user_id = post_data['user_id']
    conversations = await get_conversations(user_id)
    print(conversations)
    # text=json.dumps(conversation),
    return web.Response( status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })


async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')
