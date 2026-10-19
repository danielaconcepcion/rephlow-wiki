import serial
import keyboard
import time


# ==================================================
# ARDUINO CONNECTION
# ==================================================

arduino = serial.Serial("COM9", 9600)

time.sleep(2)


# ==================================================
# SPEED LEVELS
# ==================================================

current_level = 1

minimum_level = 1
maximum_level = 30


speed_rpm = {
     1: 0,
     2: 5,
     3: 10,
     4: 15,
     5: 20,
     6: 25,
     7: 30,
     8: 35,
     9: 40,
    10: 45,
    11: 50,
    12: 55,
    13: 60,
    14: 65,
    15: 70,
    16: 75,
    17: 80,
    18: 85,
    19: 90,
    20: 95,
    21: 100,
    22: 105,
    23: 110,
    24: 115,
    25: 120,
    26: 125,
    27: 130,
    28: 135,
    29: 140,
    30: 145
}


# ==================================================
# TIMER
# ==================================================

rotating = False

start_time = 0

rotation_time = 0


# ==================================================
# SHOW SPEED
# ==================================================

def show_speed():

    speed = speed_rpm[current_level]

    print(
        f"Current speed: "
        f"Level {current_level}/30 "
        f"| Speed: {speed} RPM"
    )


# ==================================================
# INCREASE SPEED
# ==================================================

def increase_speed():

    global current_level

    if current_level < maximum_level:

        current_level += 1

        arduino.write(b'w')

        show_speed()

    else:

        print("Maximum speed reached: Level 30")


# ==================================================
# DECREASE SPEED
# ==================================================

def decrease_speed():

    global current_level

    if current_level > minimum_level:

        current_level -= 1

        arduino.write(b's')

        show_speed()

    else:

        print("Motor is already stopped")


# ==================================================
# STOP MOTOR
# ==================================================

def stop_motor():

    global current_level
    global rotating

    arduino.write(b' ')

    current_level = 1

    rotating = False

    print()
    print("--------------------------------")
    print("STEPPER MOTOR STOPPED")
    print("Level: 1/30")
    print("Speed: 0 RPM")
    print("--------------------------------")


# ==================================================
# SET ROTATION TIME
# ==================================================

def set_rotation_time():

    global rotating
    global start_time
    global rotation_time

    try:

        seconds = float(
            input(
                "\nHow many seconds do you want "
                "the motor to rotate? "
            )
        )

        if seconds <= 0:

            print("The time must be greater than 0.")

            return


        if current_level == 1:

            print()
            print("The motor is stopped.")
            print("Set a speed first using W.")

            return


        rotation_time = seconds

        start_time = time.time()

        rotating = True


        print()
        print("--------------------------------")
        print("ROTATION STARTED")
        print(
            f"Speed: Level "
            f"{current_level}/30"
        )
        print(
            f"Speed: "
            f"{speed_rpm[current_level]} RPM"
        )
        print(
            f"Rotation time: "
            f"{rotation_time} seconds"
        )
        print("--------------------------------")


    except ValueError:

        print("Please enter a valid number.")


# ==================================================
# UPDATE TIMER
# ==================================================

def update_timer():

    global rotating

    if not rotating:

        return


    elapsed_time = time.time() - start_time

    remaining_time = rotation_time - elapsed_time


    if remaining_time > 0:

        minutes = int(remaining_time // 60)

        seconds = remaining_time % 60

        print(
            f"\rTime remaining: "
            f"{minutes:02d}:{seconds:04.1f} "
            f"| Level: {current_level}/30 "
            f"| Speed: "
            f"{speed_rpm[current_level]} RPM   ",
            end="",
            flush=True
        )


    else:

        stop_motor()

        print("Time finished.")


# ==================================================
# MAIN MENU
# ==================================================

print("--------------------------------")
print("       STEPPER CONTROL")
print("--------------------------------")

print("W      = increase speed")
print("S      = decrease speed")
print("T      = timed rotation")
print("SPACE  = stop")
print("ESC    = exit")

print("--------------------------------")

print("SPEED LEVELS")
print("--------------------------------")


for level in range(1, 31):

    if level == 1:

        print(
            f"Level {level:2d} = STOP"
        )

    else:

        print(
            f"Level {level:2d} = "
            f"{speed_rpm[level]} RPM"
        )


print("--------------------------------")

show_speed()

print("--------------------------------")


# ==================================================
# MAIN PROGRAM
# ==================================================

try:

    while True:


        # ==========================================
        # TIMER
        # ==========================================

        update_timer()


        # ==========================================
        # W
        # ==========================================

        if keyboard.is_pressed("w"):

            increase_speed()

            while keyboard.is_pressed("w"):

                time.sleep(0.01)


        # ==========================================
        # S
        # ==========================================

        if keyboard.is_pressed("s"):

            decrease_speed()

            while keyboard.is_pressed("s"):

                time.sleep(0.01)


        # ==========================================
        # T
        # ==========================================

        if keyboard.is_pressed("t"):

            set_rotation_time()

            while keyboard.is_pressed("t"):

                time.sleep(0.01)


        # ==========================================
        # SPACE
        # ==========================================

        if keyboard.is_pressed("space"):

            stop_motor()

            while keyboard.is_pressed("space"):

                time.sleep(0.01)


        # ==========================================
        # ESC
        # ==========================================

        if keyboard.is_pressed("esc"):

            print("\nClosing...")

            break


        time.sleep(0.01)


# ==================================================
# SAFETY STOP
# ==================================================

finally:

    arduino.write(b' ')

    time.sleep(0.2)

    arduino.close()

    print("Arduino disconnected.")