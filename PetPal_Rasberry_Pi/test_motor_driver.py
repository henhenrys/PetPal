from adafruit_servokit import ServoKit

kit = ServoKit(channels=16)

print("Hello")

# Move servo on channel 0
kit.servo[0].angle = 90

