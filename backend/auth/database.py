import aiopg
import asyncio
from uuid import UUID


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def create_user(email: str, password: str, token: UUID):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                INSERT INTO users
                (email, password, token)
                VALUES
                ('{email}', '{password}', '{token}');
                """.format(email=email, password=password, token=token)
                await cur.execute(s)
