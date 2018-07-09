
const fs = require('fs');
const http = require('http');
const trilateration = require('./node_modules/trilateration/index.js');

// min and max values for X and Y
const minX = 0;
const maxX = 6.47;
const minY = 0;
const maxY = 10.65;

index = fs.readFileSync(__dirname + '/index.html');

/* // Adding three beacons SECOND SETTING
trilateration.addBeacon(2, trilateration.vector(0, 7.9));
trilateration.addBeacon(0, trilateration.vector(3.97, 9.85));
trilateration.addBeacon(1, trilateration.vector(6.47, 7.9)); */

//Adding three beacons FIRST SETTING
trilateration.addBeacon(1, trilateration.vector(6.47, 4.65));
trilateration.addBeacon(0, trilateration.vector(0, 9.69));
trilateration.addBeacon(2, trilateration.vector(2, 1));


function correct_position(pos, minX, maxX, minY, maxY) {
    if (pos.x < minX) pos.x = minX;
    if (pos.x > maxX) pos.x = maxX;
    if (pos.y < minY) pos.y = minY;
    if (pos.y > maxY) pos.y = maxY;

    return pos;
}



let s = http.createServer(
    (req, res) => {
        console.log(`Request: ${req.method} URL: ${req.url}`)

        if (req.method == 'POST') {
            let data = ''
            req.on('data', chunk => {
                console.log(`Received ${chunk.length} bytes of data.`)
                data += chunk;
            })
            req.on('end', () => {
                console.log('No more data.')
                try {
                    let obj = JSON.parse(data)
                    res.writeHead(200, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({ error: null, type: typeof obj }) + '\n')

                    let clientId = obj.id;
                    let distances = obj.distance;

                    console.log(distances);

                    //Setting the beacons distances
                    trilateration.setDistance(distances[0].beaconId, distances[0].distance);
                    trilateration.setDistance(distances[1].beaconId, distances[1].distance);
                    trilateration.setDistance(distances[2].beaconId, distances[2].distance);


                    var pos = trilateration.calculatePosition();

                    pos = correct_position(pos, minX, maxX, minY, maxY);

                    console.log("X: " + pos.x + "; Y: " + pos.y);

                    io.emit('coordinate', [[pos.x, pos.y, clientId]]);

                }
                catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" })
                    res.end(JSON.stringify({ error: err.message }) + '\n')
                }
            })
        }

        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(index);
        }

    })

let io = require('socket.io').listen(s);

s.listen(80);
console.log("Server is listening on port 80");
