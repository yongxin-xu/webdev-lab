'''
To test: python3 -m websockets ws://localhost:8081/
Then paste one of the following messages:
    * { "type": "login", "username": "walter" }
    * { "type": "disconnect" }
    * { "type": "chat", "text": "Hello world!", "username": "walter" }
    
'''

from dotenv import load_dotenv
load_dotenv()

import asyncio
import websockets
import json
import os

logged_in_users = dict()

PORT = os.environ.get('PORT') or os.environ.get('WS_PORT') or 8081

async def respond_to_message(websocket, message):
    try:
        data = json.loads(message)
    except:
        data = { 'error': 'error decoding "{0}"'.format(message)}
        await websocket.send(json.dumps(data))
        return
    
    # Relay messages:
    # print(data)
    type = data.get('type')

    if type == 'login':
        logged_in_users[websocket] = data.get('username')
        response = {
            'type': 'login',
            'active_users': list(logged_in_users.values()),
            'user_joined': data.get('username')
        }
    elif type == 'disconnect':
        user_who_left = logged_in_users[websocket];
        del logged_in_users[websocket]
        response = {
            'type': 'disconnect',
            'active_users': list(logged_in_users.values()),
            'user_left': user_who_left
        }
    elif type == 'chat':
        response = data
    else:
        print("Message type not recognized", data)
        response = {
            'message': 'Message type not recognized',
            'source': data
        }

    for sock in logged_in_users:
        await sock.send(json.dumps(response))


async def handle_disconnect(websocket):
    disconnected_user = logged_in_users[websocket];
    del logged_in_users[websocket]
    response = {
        'type': 'disconnect',
        'active_users': list(logged_in_users.values()),
        'user_left': disconnected_user
    }
    for sock in logged_in_users:
        await sock.send(json.dumps(response))

async def broadcast_messages(websocket, path):
    try:
        async for message in websocket:
            await respond_to_message(websocket, message)
    except websockets.ConnectionClosed as e:
        print('A client just disconnected')
        print(e)
        handle_disconnect(websocket)
    finally:
        if logged_in_users.get(websocket):
            del logged_in_users[websocket]
    

async def main():
    async with websockets.serve(broadcast_messages, "", PORT):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    print('Starting web socket server...')
    print('ws://localhost:{0}'.format(PORT))
    asyncio.run(main())