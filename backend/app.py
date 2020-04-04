from aiohttp import web, WSMsgType

from routes import setup_routes
from init import init_database

from aiohttp_session import setup, get_session, session_middleware
from cryptography import fernet
from aiohttp_session.cookie_storage import EncryptedCookieStorage
import base64

app = web.Application()
# Cookie
fernet_key = fernet.Fernet.generate_key()
secret_key = base64.urlsafe_b64decode(fernet_key)
setup(app, EncryptedCookieStorage(secret_key))

setup_routes(app, web)
init_database()



web.run_app(app)
