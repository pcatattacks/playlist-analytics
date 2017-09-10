import React, {Component} from 'react';
import Inputbar from './Inputbar';
import Progress from './Progressbar';
import style from '../style';
import Data from './Data';
const axios = require("axios");
// for charting



/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class Controller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistData: null,
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick = (event) => {
        // console.log("keypress registered"); // debugging statement
        this.setState({loading:<Progress />});
        var textval = this.Inputbar.state.value;
        var pathparts = textval.split('/');
        console.log(pathparts); // debugging statement
        // making request to backend
        axios.get('/api/playlist',
            {params: {userID:pathparts[4], playlistID:pathparts[6]}}
        ).then( (response, body) => {
            this.setState({playlistData: response.data, loading:null})
            // console.log(this.state.playlistData);
        }).catch( (error) => {
            this.setState({loading:null});
            console.log(error);
        });
    }
    
    render() {
        var dataComponent = null;
        if (this.state.playlistData !== null) {
            dataComponent = <Data data={this.state.playlistData} />;
        }
        return (
            <div style={style.Inputbar}>
                <Inputbar ref={(ref)=>{this.Inputbar = ref;}}
                        onClick={this.handleButtonClick} />
                <br/>
                {this.state.loading}
                {dataComponent}
            </div>
        )};
}