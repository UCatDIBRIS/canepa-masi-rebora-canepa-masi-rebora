# Trilateration

> A simple solution to the trivial problem of trilateration.

## Problem

You've got three beacons, their distances to your device and you want to calculate the device's position.

## Theory

Suppose we have three circles, which centers are the positions of beacon. The radius equals to the distances of the beacons. Let the circles be A, B, and C.

Each circle's formula would look like this:

![Formula Circle](https://github.com/philplckthun/trilateration/raw/master/img/circle.png)

Substracting two circles would give a linear equation, which crosses their two intersections:

![Linear Equation from Subtraction](https://github.com/philplckthun/trilateration/raw/master/img/linearfunction.png)

Calculating the intersection of two of these linear equations give the x-value of the devices position in between the beacons.

![Calculate x-value via intersecting](https://github.com/philplckthun/trilateration/raw/master/img/calculateX.png)

This value can then be inserted in one of the two linear equations to get the corresponding y-value.

## Installation

```
npm install trilateration
```

## Usage

```javascript
var trilateration = require('./index.js');

# Adding three beacons
trilateration.addBeacon(0, trilateration.vector(2, 4));
trilateration.addBeacon(1, trilateration.vector(5.5, 13));
trilateration.addBeacon(2, trilateration.vector(11.5, 2));

# Setting the beacons distances
trilateration.setDistance(0, 5.7);
trilateration.setDistance(1, 6.8);
trilateration.setDistance(2, 6.4);

# Start Calculation
var pos = trilateration.calculatePosition();

console.log("X: " + pos.x + "; Y: " + pos.y); // X: 7; Y: 6.5
```

## API

### function addBeacon(Index, Vector)

Adds a beacon with the index given and the position from the vector.

### function setDistance(Index, Integer)

Sets the distance to a beacon at the index.

### function calculatePosition()

Starts the calculation of the position and returns a vector for your device's position.

### function vector(x, y)

Creates a vector object (dictionary) with the given x and y coordinates.

## License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
