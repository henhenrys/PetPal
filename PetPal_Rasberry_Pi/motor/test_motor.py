import time
from adafruit_servokit import ServoKit

kit = ServoKit(channels=16)

kit.servo[0].set_pulse_width_range(500, 2500)
kit.servo[1].set_pulse_width_range(500, 2500)
kit.servo[2].set_pulse_width_range(500, 2500)

try:
	while True:
		for val in range(0,3):
			print("0 degrees")
			kit.servo[val].angle = 0
		time.sleep(1)
		
		for val in range(0,3):
			print("90 degrees")
			kit.servo[val].angle = 90
		time.sleep(1)

		for val in range(0,3):
			print("180 degrees")
			kit.servo[val].angle = 180
		time.sleep(1)
except KeyboardInterrupt:
	kit.servo[0].angle = 0
	kit.servo[1].angle = 0
	kit.servo[2].angle = 0
	print("stop")


# #3
