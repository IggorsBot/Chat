import aiopg
import asyncio
import bcrypt


dsn = 'dbname=chatdb user=chat password=chatpass host=localhost'

users = [{"name": "James", "password": "123456", "email": "James@mail.ru"},
    {"name": "John", "password": "qwerty", "email": "John@gmail.com"},
    {"name": "Robert", "password": "123456", "email": "Robert@mail.ru"},
    {"name": "Michael", "password": "michaelpass", "email": "Michael@gmail.com"},
    {"name": "William", "password": "william123", "email": "William@mail.ru"},
    {"name": "David", "password": "davidqwe", "email": "David@gmail.com"},
    {"name": "Richard", "password": "123richard", "email": "Richard@mail.ru"},
    {"name": "Charles", "password": "123456", "email": "Charles@gmail.com"},
    {"name": "Joseph", "password": "qwerty", "email": "Joseph@mail.ru"},
    {"name": "Thomas", "password": "thomasqwe", "email": "Thomas@gmail.com"},
    {"name": "Christopher", "password": "christopher98", "email": "Christopher@mail.ru"},
    {"name": "Daniel", "password": "daniel1995", "email": "Daniel@gmail.com"}]

chats = [{"name": "Work", "user_id": 1}, {"name": "Rest", "user_id": 4},
        {"name": "Holidays", "user_id": 7}, {"name": "News", "user_id": 10},
        {"name": "Auto", "user_id": 3}, {"name": "Business", "user_id": 8}]

parties = [{"chat_id": 1, "user_id": 1}, {"chat_id": 1, "user_id": 2},
        {"chat_id": 1, "user_id": 3}, {"chat_id": 1, "user_id": 4},
        {"chat_id": 2, "user_id": 4}, {"chat_id": 2, "user_id": 6},
        {"chat_id": 2, "user_id": 2}, {"chat_id": 2, "user_id": 7},
        {"chat_id": 3, "user_id": 7}, {"chat_id": 3, "user_id": 8},
        {"chat_id": 4, "user_id": 10}, {"chat_id": 4, "user_id": 11},
        {"chat_id": 5, "user_id": 3}, {"chat_id": 5, "user_id": 4},
        {"chat_id": 6, "user_id": 8}, {"chat_id": 6, "user_id": 9}]

messages = [{"chat_id": 1, "user_id": 1, "contect": "Hello everybody!")},
            {"chat_id": 1, "user_id": 2, "contect": "Hello"},
            {"chat_id": 1, "user_id": 3, "contect": "Hi"},
            {"chat_id": 2, "user_id": 4, "contect": "Hi, Susan! You came so early today."},
            {"chat_id": 2, "user_id": 6, "contect": "Yes, I did. I met her near the headmaster’s office."},
            {"chat_id": 2, "user_id": 2, "contect": "She looks nice, doesn’t she?"},
            {"chat_id": 2, "user_id": 7, "contect": "I think so. Did you learn the lesson?"},
            {"chat_id": 3, "user_id": 7, "contect": "What can i do for you"},
            {"chat_id": 3, "user_id": 8, "contect": "I would like to cash this cheque"},
            {"chat_id": 3, "user_id": 7, "contect": "Oh, I am terrible sorry. Here you are"},
            {"chat_id": 3, "user_id": 8, "contect": "Four fives and three tens"},
            {"chat_id": 5, "user_id": 3, "contect": "Hello, Michael! How are you? "},
            {"chat_id": 5, "user_id": 4, "contect": "Hello, Robert! Just wonderful! Glad to see you."}]

async def create_users(user):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                password = user["password"].encode()
                hashed = bcrypt.hashpw(password, bcrypt.gensalt())
                hash_password = hashed.decode()
                s = """INSERT INTO users (name, password, email)
                VALUES ('{user_name}', '{password}', '{email}');
                """.format(user_name=user['name'], password=hash_password, email=user['email'])
                await cur.execute(s)

async def create_chats(chat):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """INSERT INTO chat (name, user_id)
                VALUES ('{chat_name}', '{user_id}');
                """.format(chat_name=chat['name'], user_id=chat['user_id'])
                await cur.execute(s)

async def create_party(party):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """INSERT INTO party (chat_id, user_id)
                VALUES ('{chat_id}', '{user_id}');
                """.format(chat_id=party['chat_id'], user_id=party['user_id'])
                await cur.execute(s)

async def create_message(message):
    async with aiopg.create_pool(dsn) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                s = """INSERT INTO messages (chat_id, user_id, contect)
                VALUES ('{chat_id}', '{user_id}', '{contect}');
                """.format(chat_id=message['chat_id'],
                            user_id=message['user_id'],
                            contect=message['contect'])
                await cur.execute(s)

async def create_data():
    print('-------------------------')
    print('Create data...')
    for user in users:
        await create_users(user)
    for chat in chats:
        await create_chats(chat)
    for party in parties:
        await create_party(party)
    for message in messages:
        await create_message(message)
    print('Create data finished')
    print('-------------------------')

def main():
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(create_data())

if __name__ == "__main__":
    main()
