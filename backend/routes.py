from chat.controllers import websocket_handler, get_messages, conversations, index
from auth.controllers import login, registration, get_user, logout
import aiohttp_cors


def setup_routes(app, web):
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
    })


    # Auth
    resource = cors.add(app.router.add_resource("/auth/registration"))
    cors.add(resource.add_route("POST", registration))

    resource = cors.add(app.router.add_resource("/auth/login"))
    cors.add(resource.add_route("POST", login))

    resource = cors.add(app.router.add_resource("/auth/user"))
    cors.add(resource.add_route("GET", get_user))

    resource = cors.add(app.router.add_resource("/api/auth/logout"))
    cors.add(resource.add_route("GET", logout))

    # Chat
    app.add_routes([web.get('/ws', websocket_handler)])

    resource = cors.add(app.router.add_resource("/messages/{chat_id}"))
    cors.add(resource.add_route("GET", get_messages))

    resource = cors.add(app.router.add_resource("/chat/conversations"))
    cors.add(resource.add_route("GET", conversations))

    resource = cors.add(app.router.add_resource("/{tail:.*}"))
    cors.add(resource.add_route("GET", index))
