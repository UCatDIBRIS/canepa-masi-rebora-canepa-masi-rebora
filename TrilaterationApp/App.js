'use strict';

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  Text,
  ListView,
  View,
  DeviceEventEmitter
} from 'react-native';
import Beacons from 'react-native-beacons-manager';


export default class reactNativeBeaconExample extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }
    );

    this.state = {
      // region information
      uuidRef: 'fda50693-a4e2-4fb1-afcf-c6eb07647825',
      clientID: Math.floor(Math.random() * 1000),
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    //
    // ONLY non component state aware here in componentWillMount
    //

    // ANDROID SETUP
    if (Platform.OS === 'android') {
      Beacons.detectIBeacons();
      //Beacons.setForegroundScanPeriod(500);
      //Beacons.setRssiFilter(Beacons.ARMA_RSSI_FILTER, 0.2);
      Beacons.setRssiFilter(Beacons.RUNNING_AVG_RSSI_FILTER, 5000);

      const uuid = this.state.uuidRef;
      Beacons
        .startRangingBeaconsInRegion(
          'REGION1',
          uuid
        )
        .then(
          () => console.log('Beacons ranging started succesfully')
        )
        .catch(
          error => console.log(`Beacons ranging not started, error: ${error}`)
        );
    }

    else { // IOS SETUP

      // Request for authorization while the app is open
      Beacons.requestWhenInUseAuthorization();
      // Define a region
      const region = {
        identifier: 'REGION1',
        uuid: this.state.uuidRef
      };
      // Range for beacons inside the region
      Beacons.startRangingBeaconsInRegion(region);
      // Beacons.startUpdatingLocation();
    }
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //

    // Ranging:
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log('----------------------------------------------------------');
        console.log(data.beacons);
        if (data.beacons.length === 3) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.beacons)
          });

          let distances = [];
          for (var i = 0; i < data.beacons.length; i++) {
            let beacon_distance = Platform.OS === 'ios' ? data.beacons[i].accuracy : data.beacons[i].distance;
            let cell = {
              beaconId: data.beacons[i].major,
              distance: beacon_distance
            }
            distances[i] = cell;
          }

          let payload = {
            id: this.state.clientID,
            distance: distances
          }

          fetch('http://192.168.43.30:80', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }).catch(function(){
            console.log("network error");
          });
        }
      }
    );
  }

  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          All beacons in the area
         </Text>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow = rowData => {
    var beacon_distance = Platform.OS === 'ios' ? rowData.accuracy : rowData.distance;
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {beacon_distance ? beacon_distance.toFixed(2) : 'NA'} m
         </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  btleConnectionStatus: {
    // fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  }
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);