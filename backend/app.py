from aiohttp import web, WSMsgType


async def index(request):
    return web.FileResponse('./../frontend/templates/index.html')


async def websocket_handler(request):

    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print('here')

    async for msg in ws:
        print("message", msg.data)
        if msg.type == WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                pass
                # Сохраняем сообщение в БД
        elif msg.type == WSMsgType.ERROR:
            print('ws connection closed with exception %s' %
                  ws.exception())

    print('websocket connection closed')

    return ws


app = web.Application()
app.add_routes([web.get('/', index)])
app.add_routes([web.get('/ws', websocket_handler)])




web.run_app(app)
