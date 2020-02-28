import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def create_message(message):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = "INSERT INTO messages (message_id, chat_id, user_id, contect, date_create) VALUES (6, 1, 1, '{message}', now());".format(message=message[1:-1])
                await cur.execute(s)
    print("ALL DONE")


async def get_messages_chat():
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute("SELECT contect, users.name, date_create FROM messages, users WHERE chat_id=1")
                res = []

                async for row in cur:
                    ret = {'contect': row[0], 'user': row[1], 'date': str(row[2])}
                    res.append(ret)
                return res
