from aiohttp import web, WSMsgType
import aiohttp_cors
from chat_views import websocket_handler, messages, index


app = web.Application()
app.add_routes([web.get('/', index)])
app.add_routes([web.get('/ws', websocket_handler)])


cors = aiohttp_cors.setup(app)
resource = cors.add(app.router.add_resource("/messages/{chat_id}"))
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
