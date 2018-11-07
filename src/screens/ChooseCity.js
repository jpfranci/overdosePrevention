import {Button, Picker, Text, View} from "react-native";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";
import { Permissions } from 'expo';

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";

    constructor(props) {
        super(props);
        this.state = {useLocation: false, locationPermissionGranted: false};
    }

    componentDidUpdate() {
        console.warn(this.state.useLocation);

        if (this.state.useLocation) this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                useLocation: false,
            });
        }

        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    render() {
        return (
            <View style={{ flex: 1,
                backgroundColor: 'white',
                alignItems: "center"
            }}>
                <View style={{ flex: 1, margin: 100}}>
                    <OpsLogo height="100" width="100"/>
                </View>

                <View style={{flex: 3, margin: 40, alignItems: "center" }}>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.useLocation}
                        style={{ height: 50, width: 250 }}
                        onValueChange={(itemValue) => this.setState({useLocation: itemValue})}>
                        <Picker.Item label="Anonymous" value={false} />
                        <Picker.Item label="Enable location services" value={true} />
                    </Picker>
                    <Button
                        title=" Go To Map Screen"
                        onPress={() => this.props.navigation.navigate(MapScreen.ScreenName)}
                    />
                </View>


            </View>
        );
    }
}

ChooseCityScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};