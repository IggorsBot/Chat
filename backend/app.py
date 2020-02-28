from aiohttp import web, WSMsgType
import aiopg
from chat_database import create_message, get_messages_chat

async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')


async def websocket_handler(request):

    ws = web.WebSocketResponse()
    await ws.prepare(request)

    chat_messages = await get_messages_chat()
    # for message in chat_messages:
    #     await ws.send_str(str(message))
    # await ws.send_json({"result":4, "count":42})
    for message in chat_messages:
        await ws.send_json(message)

    async for msg in ws:
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                await create_message(msg.data)
        elif msg.type == WSMsgType.ERROR:
            print('ws connection closed with exception %s' %
                  ws.exception())

    print('websocket connection closed')

    return ws

app = web.Application()
app.add_routes([web.get('/', index)])
app.add_routes([web.get('/ws', websocket_handler)])


web.run_app(app)
