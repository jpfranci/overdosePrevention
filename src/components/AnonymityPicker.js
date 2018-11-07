import React from "react";
import {Platform, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {Permissions} from "expo";


export default class AnonymityPicker extends React.Component {

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.pickerValue = PICKER_VALUES.ANONYMOUS;
            this.setState({useLocation: false});
        }

        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    constructor(props) {
        super(props);
        this.pickerValue = PICKER_VALUES.ANONYMOUS;
        this.state = {useLocation: false};
    }

    componentDidUpdate() {
        if (this.state.useLocation) this._getLocationAsync();
    }

    render() {
        const style = pickerSelectStyles;

        if (Platform.OS === "ios") {
            return (<RNPickerSelect
                placeholder={{}}
                value={this.pickerValue}
                style={{...style }}
                items={[
                    {label: "Anonymous", value: PICKER_VALUES.ANONYMOUS},
                    {label: "Enable location service", value: PICKER_VALUES.USE_LOCATION}
                ]}
                onValueChange={(value) => { this.pickerValue = value; }}
                modalProps={{onDismiss: () => { this._updateLocationServiceState() }}}
            />)
        } else {
            return (<RNPickerSelect
                placeholder={{}}
                value={this.pickerValue}
                style={{...style }}
                items={[
                    {label: "Anonymous", value: PICKER_VALUES.ANONYMOUS},
                    {label: "Enable location service", value: PICKER_VALUES.USE_LOCATION}
                ]}
                onValueChange={(value) => {
                    this.pickerValue = value;
                    this._updateLocationServiceState();
                }}
            />)
        }
    }

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
}

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

const PICKER_VALUES = {
    ANONYMOUS: "anonymous",
    USE_LOCATION: "use_location"
};