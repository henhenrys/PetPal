import RPi.GPIO as GPIO
import time

# Set up GPIO
GPIO.setmode(GPIO.BCM)  # Use Broadcom pin numbering
servo_pin = 18  # GPIO 18 (Physical pin 12) - Change if using a different pin
GPIO.setup(servo_pin, GPIO.OUT)

# Set up PWM at 50Hz (standard for servos)
pwm = GPIO.PWM(servo_pin, 50)
pwm.start(0)  # Initialize with 0% duty cycle

def set_angle(angle):
    # Convert angle to duty cycle
    # For most servos: 2.5% duty cycle = 0°, 12.5% duty cycle = 180°
    duty = angle / 18 + 2.5
    pwm.ChangeDutyCycle(duty)
    time.sleep(0.3)  # Give the servo time to move

# Test the servo with a simple sequence
try:
    while True:
        print("Moving to 0 degrees")
        set_angle(0)
        time.sleep(1)
        
        print("Moving to 90 degrees")
        set_angle(90)
        time.sleep(1)
        
        print("Moving to 180 degrees")
        set_angle(180)
        time.sleep(1)
        
except KeyboardInterrupt:
    # Clean up on Ctrl+C
    pwm.stop()
    GPIO.cleanup()
    print("Program stopped")