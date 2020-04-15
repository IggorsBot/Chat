import aiopg
import asyncio
from uuid import UUID


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def create_user(person_id: int, email: str, password: str, token: UUID):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                INSERT INTO users
                (person_id, email, password, token)
                VALUES
                ('{person_id}', '{email}', '{password}', '{token}');
                """.format(person_id=person_id, email=email, password=password, token=token)
                await cur.execute(s)

async def get_user_from_email(email: str) -> dict:
    """
    Получаем пользователя по его email
    """
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                SELECT *
                FROM users
                WHERE email='{email}'
                """.format(email=email)
                await cur.execute(s)
                ret: dict = {}
                async for row in cur:
                    ret = {'user_id': row[0], 'name': row[1], 'password': row[2], 'email': row[3], 'token': row[4]}
                return ret

async def get_user_from_token(token: UUID):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                SELECT *
                FROM users
                WHERE token='{token}'
                """.format(token=token)
                await cur.execute(s)
                ret: dict = {}
                async for row in cur:
                    ret = {'user_id': row[0], 'name': row[1], 'password': row[2], 'email': row[3], 'token': row[4]}
                return ret
