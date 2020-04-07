import aiopg
import asyncio


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

async def get_conversations(user_id: int):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                SELECT chat.chat_id, chat.name
                FROM chat
                INNER JOIN party ON chat.chat_id = party.chat_id
                WHERE party.user_id = '{user_id}';
                """.format(user_id = user_id)
                await cur.execute(s)

                res = []
                async for row in cur:
                    ret = {'chat_id': row[0], 'chat_name': row[1]}
                    res.append(ret)
                return res

async def get_messages_from_db(chat_id: int):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                SELECT *
                FROM messages
                WHERE chat_id = {chat_id}
                """.format(chat_id = chat_id)
                await cur.execute(s)

                res = []
                async for row in cur:
                    ret = {
                        'message_id': row[0],
                        'chat_id': row[1],
                        'user_id': row[2],
                        'contect': row[3],
                        'date_create': row[4]
                        }
                    res.append(ret)
                return res

async def create_message(msg_dict: dict):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """
                INSERT INTO messages
                (chat_id, user_id, contect)
                VALUES
                ('{chat_id}', '{user_id}', '{contect}')
                RETURNING *;
                """.format(chat_id = msg_dict['chat_id'],
                           user_id = msg_dict['user_id'],
                           contect = msg_dict['contect'])
                await cur.execute(s)
                res = {}
                async for row in cur:
                    res['message_id'] = row[0]
                    res['chat_id'] = row[1]
                    res['user_id'] = row[2]
                    res['contect'] = row[3]
                    res['date_create'] = row[4]
                return res
