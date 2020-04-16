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
                    ret = {
                        'user_id': row[0],
                        'person_id': row[1],
                        'name': row[2],
                        'password': row[3],
                        'email': row[4],
                        'token': row[5]
                        }
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
                    ret = {
                        'user_id': row[0],
                        'person_id': row[1],
                        'name': row[2],
                        'password': row[3],
                        'email': row[4],
                        'token': row[5]
                        }
                return ret
