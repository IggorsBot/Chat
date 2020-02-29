from aiohttp import web, WSMsgType
import aiopg
from chat_database import create_message, get_messages_chat
import asyncio
import json
import aiohttp_cors


async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                print(msg.data)
                # await create_message(msg.data)

        elif msg.type == WSMsgType.ERROR:
            print('ws connection closed with exception %s' %
                  ws.exception())

    print('websocket connection closed')

    return ws

async def messages(request):
    chat_id = request.match_info.get('chat_id')
    chat_messages = await get_messages_chat(chat_id)
    print(chat_messages)
    return web.Response(text=json.dumps(chat_messages), status=200, headers={
        "X-Custom-Server-Header": "Custom data",
    })

app = web.Application()
app.add_routes([web.get('/', index)])
app.add_routes([web.get('/messages/{chat_id}', messages)])
app.add_routes([web.get('/ws', websocket_handler)])

async def handler(request):
    return web.Response(
        text="Hello!",
        headers={
            "X-Custom-Server-Header": "Custom data",
        })


cors = aiohttp_cors.setup(app)
resource = cors.add(app.router.add_resource("/hello/{chat_id}"))
route = cors.add(
    resource.add_route("GET", messages), {
        "http://127.0.0.1:800": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    })

web.run_app(app)
