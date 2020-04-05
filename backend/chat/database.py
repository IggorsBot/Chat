import aiopg
import asyncio


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def get_conversations(user_id: int):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                SELECT chat.name
                FROM chat
                INNER JOIN party ON chat.chat_id = party.chat_id
                WHERE party.user_id = '{user_id}';
                """.format(user_id = user_id)

                await cur.execute(s)

                res = []
                async for row in cur:
                    ret = {'chat_name': row[0]}
                    res.append(ret)
                return res
