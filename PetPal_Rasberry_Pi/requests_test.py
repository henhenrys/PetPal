import requests
import asyncio
import websockets
import json
import time
from adafruit_servokit import ServoKit

kit = ServoKit(channels=16)
kit.servo[0].set_pulse_width_range(500, 2500)
kit.servo[1].set_pulse_width_range(500, 2500)
kit.servo[2].set_pulse_width_range(500, 2500)
kit.servo[3].set_pulse_width_range(500, 2500)
kit.servo[4].set_pulse_width_range(500, 2500)

def runMotor(aMotorNum):
    kit.servo[aMotorNum].angle = 0
    time.sleep(1)
    kit.servo[aMotorNum].angle = 90
    time.sleep(1)
    kit.servo[aMotorNum].angle = 0
    



signup_data = {
    "name" : "Fred",
    "email" : "Fred@example.com",
    "password" : "Farris",
    "location" : "San Diego"
}

response = requests.post("https://petpal-3yfg.onrender.com/api/signup", json=signup_data)

print("Status Code: ", response.status_code)
print("Response JSON:", response.json())


login_data = {
    "email" : "dog@example.com",
    "password" : "doggy"
}

response2 = requests.post("https://petpal-3yfg.onrender.com/api/login", json=login_data)

if response2.ok:
    print("Logged in: ", response2.json())
else:
    print("Login failed: ", response2.text)

async def move_motor():
    uri = "wss://petpal-3yfg.onrender.com/ws/motor"
    async with websockets.connect(uri) as websocket:
        print("Connected to server...")
        while True:
            try:
                msg = await websocket.recv()
                data = json.loads(msg)
                motor_num = data["motor"]
                print("Motor Command Recieved for Motor number ", motor_num)
                runMotor(motor_num)

            except Exception as e:
                print(f"Error: {e}")
                break

asyncio.run(move_motor())



