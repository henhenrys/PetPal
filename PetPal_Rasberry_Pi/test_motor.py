import time
from adafruit_servokit import ServoKit

kit = ServoKit(channels=16)

kit.servo[0].set_pulse_width_range(500, 2500)

try:
	while True:
		print("0 degrees")
		kit.servo[0].angle = 0
		time.sleep(1)

		print("90 degrees")
		kit.servo[0].angle = 90
		time.sleep(1)

		print("180 degrees")
		kit.servo[0].angle = 180
		time.sleep(1)

except KeyboardInterrupt:
	kit.servo[0].angle = 90
	print("stop")

# #3
