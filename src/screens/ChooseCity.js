import {Button, View, StyleSheet, Platform} from "react-native";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";
import { Permissions } from 'expo';
import RNPickerSelect from "react-native-picker-select";

const PICKER_VALUES = {
    ANONYMOUS: "anonymous",
    USE_LOCATION: "use_location"
};

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";
    pickerValue = PICKER_VALUES.ANONYMOUS;

    constructor(props) {
        super(props);
        this.pickerValue = PICKER_VALUES.ANONYMOUS;
        this.state = {useLocation: false};
    }

    componentDidUpdate() {
        console.warn(this.state.useLocation);

        if (this.state.useLocation) this._getLocationAsync();
    }

    render() {
        return (
            <View style={{ flex: 1,
                backgroundColor: 'white',
                alignItems: "center",
                flexDirection: "column"
            }}>
                <View style={{ flex: 2, justifyContent: "center"}}>
                    <OpsLogo height="110" width="110"/>
                </View>

                <View style={{flex: 3, marginLeft: 40, marginRight: 40, alignItems: "center", justifyContent: "space-between", alignSelf: "stretch" }}>
                    <RNPickerSelect
                        placeholder={{}}
                        value={this.pickerValue}
                        style={{...pickerSelectStyles }}
                        items={[
                            {label: "Anonymous", value: PICKER_VALUES.ANONYMOUS},
                            {label: "Enable location service", value: PICKER_VALUES.USE_LOCATION}
                        ]}
                        onValueChange={(value) => { this._onPickerValueChange(value); }}
                        modalProps={{onDismiss: () => { this._updateLocationServiceState() }}}
                    />
                    <Button
                        title=" Go To Map Screen"
                        onPress={() => this.props.navigation.navigate(MapScreen.ScreenName)}
                    />
                </View>


            </View>
        );
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.pickerValue = PICKER_VALUES.ANONYMOUS;
            this.setState({useLocation: false});
        }

        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    _updateLocationServiceState() {
        switch (this.pickerValue) {
            case PICKER_VALUES.ANONYMOUS:
                this.setState({useLocation: false});
                break;
            case PICKER_VALUES.USE_LOCATION:
                this.setState({useLocation: true});
                break;
            default:
                this.setState({useLocation: false});
                break;
        }
    }

    _onPickerValueChange(pickerVal) {
        this.pickerValue = pickerVal;

        if (Platform.OS === "android") {
            this._updateLocationServiceState();
        }
    }
}

ChooseCityScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: 'white',
        color: 'black',
    },
});