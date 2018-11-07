import {Button, View, StyleSheet, Platform} from "react-native";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";
import AnonymityPicker from "../components/AnonymityPicker";

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";

    constructor(props) {
        super(props);
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
                    <AnonymityPicker />
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