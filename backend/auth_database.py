import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def create_user(message):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = "INSERT INTO users (name, password) VALUES ({name}, {password});".format(name=message['name'], password=message['password'])
                await cur.execute(s)
