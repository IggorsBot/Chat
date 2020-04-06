import aiopg
import asyncio


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'
dsn_super = 'dbname=chatdb user=postgres password=postgres host=localhost'


async def create_tables():
    print("-----------------------------")
    print("Database initialized...")
    await create_extension()
    await create_users_table()
    await create_chat_table()
    await create_party_table()
    await create_messages_table()
    await create_message_status_table()
    print("Database initialized finished")
    print("-----------------------------")

async def create_extension():
    """
    create EXTENSION for token column
    """
    async with aiopg.create_pool(dsn_super) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
                """
                await cur.execute(s)


async def create_users_table():
    """
    user_id - id пользователя чата
    name - имя пользователя
    password - пароль пользователя
    email - email пользователя
    token - токен (необходим для аутентификации)
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS users(
                    user_id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    password VARCHAR(200) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    token uuid DEFAULT uuid_generate_v4()
                )
                """
                await cur.execute(s)

async def create_chat_table():
    """
    chat_id - порядковый id чата
    name - заголовок чата, его название
    user_id - id пользователя создавшего чат
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS chat(
                    chat_id SERIAL PRIMARY KEY,
                    name VARCHAR(40),
                    user_id INTEGER REFERENCES users(user_id)
                )
                """
                await cur.execute(s)

async def create_party_table():
    """
    chat_id - id группы чата
    user_id - id пользователя, который учавствует в переписке чата
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS party(
                    chat_id INTEGER REFERENCES chat(chat_id),
                    user_id INTEGER REFERENCES users(user_id)
                )
                """
                await cur.execute(s)


async def create_messages_table():
    """
    message_id порядковый id сообщения
    chat_id - id чата
    user_id - id пользователя, который добавил сообщение
    contect - содержимое сообщения
    date_create - дата добавления сообщения
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS messages(
                    message_id SERIAL PRIMARY KEY,
                    chat_id INTEGER REFERENCES chat(chat_id),
                    user_id INTEGER REFERENCES users(user_id),
                    contect VARCHAR(200),
                    date_create TIMESTAMP NOT NULL DEFAULT now()
                )
                """
                await cur.execute(s)

async def create_message_status_table():
    """
    message_id - id сообщения
    user_id - id пользователя
    is_read - прочитано ли сообщение
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS message_status(
                    message_id INTEGER PRIMARY KEY,
                    user_id INTEGER REFERENCES users(user_id),
                    is_read BOOLEAN
                )
                """
                await cur.execute(s)

def init_database():
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(create_tables())
