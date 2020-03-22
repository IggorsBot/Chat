from aiohttp import web, WSMsgType

from routes import setup_routes
from init import init_database


app = web.Application()
setup_routes(app, web)
init_database()
web.run_app(app)
