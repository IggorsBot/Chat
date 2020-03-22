from chat.controllers import websocket_handler, GetMessages, conversations, index
from auth.controllers import login, registration
import aiohttp_cors


def SetupRoutes(app, web):
    cors = aiohttp_cors.setup(app)

    app.add_routes([web.get('/', index)])
    app.add_routes([web.get('/ws', websocket_handler)])
    app.router.add_route('POST', '/login', login)

    resource = cors.add(app.router.add_resource("/messages/{chat_id}"))
    route = cors.add(
        resource.add_route("GET", GetMessages), {
            "http://127.0.0.1:800": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers=("X-Custom-Server-Header",),
                allow_headers=("X-Requested-With", "Content-Type"),
                max_age=3600,
            )
        })

    resource = cors.add(app.router.add_resource("/auth/registration"))
    route = cors.add(
        resource.add_route("POST", registration), {
            "http://127.0.0.1:800": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers=("X-Custom-Server-Header",),
                allow_headers=("X-Requested-With", "Content-Type"),
                max_age=3600,
            )
        })


    resource = cors.add(app.router.add_resource("/auth/login"))
    route = cors.add(
        resource.add_route("POST", login), {
            "http://127.0.0.1:800": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers=("X-Custom-Server-Header",),
                allow_headers=("X-Requested-With", "Content-Type"),
                max_age=3600,
            )
        })

    resource = cors.add(app.router.add_resource("/chat/conversations"))
    route = cors.add(
        resource.add_route("POST", conversations), {
            "http://127.0.0.1:800": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers=("X-Custom-Server-Header",),
                allow_headers=("X-Requested-With", "Content-Type"),
                max_age=3600,
            )
        })
