import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def create_user(data):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = "INSERT INTO users (email, password) VALUES ('{email}', '{password}');".format(email=data['email'], password=data['password'])
                print("s", s)
                await cur.execute(s)
