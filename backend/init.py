import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'


async def create_tables():
    print("-----------------------------")
    print("Database initialized...")
    await create_chat_table()
    await create_party_table()
    await create_messages_table()
    await create_message_status_table()
    print("Database initialized finished")
    print("-----------------------------")


async def create_chat_table():
    """
    chat_id - порядковый id чата
    name - заголовок чата, его название
    user_id - id пользователя чата
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS chat(
                    chat_id SERIAL,
                    name varchar(40),
                    user_id integer
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
                    chat_id integer,
                    user_id integer
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
                    message_id SERIAL,
                    chat_id integer,
                    user_id integer,
                    contect varchar(200),
                    date_create DATE NOT NULL DEFAULT CURRENT_DATE
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
                    message_id integer,
                    user_id integer,
                    is_read boolean
                )
                """
                await cur.execute(s)



def init_database():
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(create_tables())
