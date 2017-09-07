import React, {Component} from 'react';

import Textfield from './Textfield';
import style from '../style';
const axios = require("axios");



/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class Inputbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistData: null,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick = (event) => {
        // console.log("keypress registered"); // debugging statement
        var textval = this.TextField.state.value;
        console.log(textval);
    }
    
    render() {
        return (
            <div style={style.Inputbar}>
                <Textfield ref={(ref)=>{this.Textfield = ref;}}/>
            </div>
        )};
}