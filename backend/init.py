import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'


async def create_tables():
    print("-----------------------------")
    print("Database initialized...")
    await create_chat_table()
    print("Database initialized finished")
    print("-----------------------------")


async def create_chat_table():
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                CREATE TABLE IF NOT EXISTS chat(
                    chat_id integer,
                    name varchar(40),
                    user_id integer
                )
                """
                await cur.execute(s)

def init_database():
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(create_tables())
