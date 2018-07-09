beacons = []

sqr = (a) ->
  Math.pow a, 2

exports.vector = (x, y) ->
  x: x
  y: y

exports.setDistance = (index, distance) ->
  beacons[index].dis = distance
  return

exports.addBeacon = (index, position) ->
  beacons[index] = position
  return

exports.calculatePosition = () ->
  if beacons.length < 3
    console.error("Error! Please add at least three beacons!");
    return exports.vector 0, 0
  k =
    (
      sqr(beacons[0].x) +
      sqr(beacons[0].y) -
      sqr(beacons[1].x) -
      sqr(beacons[1].y) -
      sqr(beacons[0].dis) +
      sqr(beacons[1].dis)
    ) / (2 * (beacons[0].y - beacons[1].y)) -
    (
      sqr(beacons[0].x) +
      sqr(beacons[0].y) -
      sqr(beacons[2].x) -
      sqr(beacons[2].y) -
      sqr(beacons[0].dis) +
      sqr(beacons[2].dis)
    ) / (2 * (beacons[0].y - beacons[2].y))
  j =
    (beacons[2].x - beacons[0].x) /
    (beacons[0].y - beacons[2].y) -
    (beacons[1].x - beacons[0].x) /
    (beacons[0].y - beacons[1].y)
  x = k / j
  y =
    (
      (beacons[1].x - beacons[0].x) /
      (beacons[0].y - beacons[1].y)
    ) * x +
    (
      sqr(beacons[0].x) +
      sqr(beacons[0].y) -
      sqr(beacons[1].x) -
      sqr(beacons[1].y) -
      sqr(beacons[0].dis) +
      sqr(beacons[1].dis)
    ) / (2 * (beacons[0].y - beacons[1].y))
  exports.vector x, y
