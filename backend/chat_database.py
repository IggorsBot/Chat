import aiopg
import asyncio

dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'


async def create_message(message):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = "INSERT INTO messages (chat_id, user_id, contect, date_create) VALUES ({chat_id}, {user}, '{contect}', now());".format(chat_id=message['chatId'], user=message['user'], contect=message['contect'])
                await cur.execute(s)


async def get_messages_chat(chat_id):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute("SELECT contect, users.name, date_create FROM messages, users WHERE chat_id={chat_id}".format(chat_id=chat_id))
                res = []

                async for row in cur:
                    ret = {'contect': row[0], 'user': row[1], 'date': str(row[2])}
                    res.append(ret)
                return res
