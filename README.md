# Beacons Indoor Positioning System

The project consists in developing a prototype of an indoor positioning system (IPS) based on low-cost technologies such as BLE Beacons and testing the accuracy achieved with some empirical experiments.
IPSs are often adopted in the context of smart buildings and healthcare (hospitals, clinics …) and our idea is to use trilateration algorithms and beacons for positioning the users (or patients) in a room.
The system is composed by two smartphone apps (Android and IOS), which receives the beacon signals. Then the signals are sent to a Node.js server, which computes the positions and allows visualizing the movements of the user inside the room providing a simple Web interface.

## Authors

* **Andrea Canepa** - *4076249@studenti.unige.it*
* **Giacomo Masi** - *4083102@studenti.unige.it*
* **Rebora Stefano** - *4089450@studenti.unige.it*

## Project Structure

* The "trilateration_server" folder contains the source code for the HTTP server in Node.js
* The "TrilaterationApp" folder contains the ReactNative project of the Android/IOS client App (ReactNative 0.55.4)

## Libraries

These are the libraries included in our project
* beacon library for React Native: [react-native-beacons-manager](https://github.com/MacKentoch/react-native-beacons-manager)
* trilateration library for Node.js: [trilateration](https://www.npmjs.com/package/trilateration)
* JavaScript library for the Web monitoring interface : [D3.js](https://d3js.org/)

## React Native App Installing

Before deploying the React Native App, install the project's dependencies in the "TrilaterationApp" folder with npm

```
npm install
```
