import time
from adafruit_servokit import ServoKit

kit = ServoKit(channels=16)
''' calibrate which ever servo '''
# kit.servo[#].set_pulse_width_range(500, 2500)
# kit.servo[#].set_pulse_width_range(500, 2500)
try:
	while True:
        ''' change range to the number of servos calibrated '''
		for val in range(0,3):
			print("0 degrees")
			kit.servo[val].angle = 0
		    time.sleep(1)
		
            ''' Uncomment to test callibration '''
            
			# print("90 degrees")
			# kit.servo[val].angle = 90
		    # time.sleep(1)

			# print("180 degrees")
			# kit.servo[val].angle = 180
		    # time.sleep(1)

except KeyboardInterrupt:
    ''' set the number of servos to 0 '''
	# kit.servo[#].angle = 0
	print("stop")

