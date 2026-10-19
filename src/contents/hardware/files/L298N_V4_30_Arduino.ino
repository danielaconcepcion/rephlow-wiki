#include <Stepper.h>


// ==================================================
// MOTOR CONFIGURATION
// ==================================================

const int pasosPorRevolucion = 200;


// ==================================================
// L298N CONNECTION
// ==================================================
//
// Arduino -> L298N
//
// D8  -> IN1
// D9  -> IN2
// D10 -> IN3
// D11 -> IN4
//
// IMPORTANT:
// The order below is the same as your working
// test program.
//

Stepper miMotor(
  pasosPorRevolucion,
  8, 10, 9, 11
);


// ==================================================
// SPEED LEVELS
// ==================================================
//
// Level 1 = STOP
// Level 30 = maximum speed
//
// RPM
//

const int speedRPM[30] = {
   0,    // Level 1 - STOP
   5,    // Level 2
  10,    // Level 3
  15,    // Level 4
  20,    // Level 5
  25,    // Level 6
  30,    // Level 7
  35,    // Level 8
  40,    // Level 9
  45,    // Level 10
  50,    // Level 11
  55,    // Level 12
  60,    // Level 13
  65,    // Level 14
  70,    // Level 15
  75,    // Level 16
  80,    // Level 17
  85,    // Level 18
  90,    // Level 19
  95,    // Level 20
 100,    // Level 21
 105,    // Level 22
 110,    // Level 23
 115,    // Level 24
 120,    // Level 25
 125,    // Level 26
 130,    // Level 27
 135,    // Level 28
 140,    // Level 29
 145     // Level 30
};


// ==================================================
// CURRENT LEVEL
// ==================================================

int currentLevel = 1;


// ==================================================
// SETUP
// ==================================================

void setup() {

  Serial.begin(9600);

  currentLevel = 1;

  Serial.println("--------------------------------");
  Serial.println("       STEPPER CONTROL");
  Serial.println("--------------------------------");
  Serial.println("Arduino ready");
  Serial.println("Level 1 = STOP");

}


// ==================================================
// LOOP
// ==================================================

void loop() {


  // ==================================================
  // RECEIVE COMMAND FROM PYTHON
  // ==================================================

  if (Serial.available() > 0) {

    char command = Serial.read();


    // ----------------------------------------------
    // INCREASE SPEED
    // ----------------------------------------------

    if (command == 'w') {

      if (currentLevel < 30) {

        currentLevel++;

        int speed = speedRPM[currentLevel - 1];

        miMotor.setSpeed(speed);

        Serial.print("Level: ");
        Serial.print(currentLevel);

        Serial.print(" | Speed: ");
        Serial.print(speed);

        Serial.println(" RPM");
      }
    }


    // ----------------------------------------------
    // DECREASE SPEED
    // ----------------------------------------------

    else if (command == 's') {

      if (currentLevel > 1) {

        currentLevel--;

        int speed = speedRPM[currentLevel - 1];


        // Only call setSpeed if speed > 0
        // because setSpeed(0) is not valid.

        if (speed > 0) {

          miMotor.setSpeed(speed);
        }

        Serial.print("Level: ");
        Serial.print(currentLevel);

        Serial.print(" | Speed: ");
        Serial.print(speed);

        Serial.println(" RPM");
      }
    }


    // ----------------------------------------------
    // STOP
    // ----------------------------------------------

    else if (command == ' ') {

      currentLevel = 1;

      Serial.println("Motor stopped");
    }
  }


  // ==================================================
  // ROTATE MOTOR
  // ==================================================

  if (currentLevel > 1) {

    miMotor.step(1);
  }
}