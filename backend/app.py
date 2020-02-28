from aiohttp import web, WSMsgType
import aiopg


    # await cur.execute("SELECT name, contect, date_create FROM messages, users")
    # ret = await cur.fetchall()


async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')

async def create_message(message):
    print(message)
    conn = await aiopg.connect(database='chatdb', user='chat', password='chatpass', host='localhost')
    cur = await conn.cursor()

    s = "INSERT INTO messages (message_id, chat_id, user_id, contect, date_create) VALUES (5, 1, 1, '{message}', now());".format(message=message[1:-1])
    await cur.execute(s)
    cur.close()


async def websocket_handler(request):

    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print('here')

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
