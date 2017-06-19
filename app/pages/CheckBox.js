/**
 * checkbox
 */
'use strict';
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class CheckBox extends React.Component {
    static defaultProps = {checked: false};
    static propTypes = {

        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onSelect: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }

    componentWillUnmount() {
    }

    onChange() {
        this.setState({checked: !this.state.checked});
        this.props.onSelect();
    }

    toggle() {
        this.setState({checked: !this.state.checked});
        this.onChange(this.state.checked);
    }

    render() {

        var source = "square-o";

        if (this.state.checked) {
            source = "check-square-o";
        }

        var container = (
            <View style={styles.container}>
                <Icon name={source} size={20} style={styles.checkbox} color="black"></Icon>
            </View>
        );
        return (
            <TouchableOpacity ref="checkbox" onPress={this.toggle.bind(this)}>
                {container}
            </TouchableOpacity>
        )
    }
};

var styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        width: 28,
        height: 28
    }
});
