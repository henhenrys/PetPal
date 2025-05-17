import subprocess

# This script is used to test the recording functionality of the microphone
# It records a short audio clip and saves it to a file


# USB sound card details
card_number = 3
device_number = 0
audio_device = f"plughw:{card_number},{device_number}"

# Recording settings
duration = 5  # seconds
output_file = "test_recording.wav"

print(f"Recording audio for {duration} seconds...")

# Record audio using arecord command
subprocess.run([
    "arecord",
    "-D", audio_device, # audio device
    "-d", str(duration),
    "-f", "cd",
    output_file])

print(f"Recording saved to {output_file}")
print("Done")