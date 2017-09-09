import React from 'react';
import Attrbar from './charts/Attrbar';
import Contributers from './charts/Contributers';
import Keybar from './charts/Keybar';
import Timebar from './charts/Timebar';
import Mode from './charts/Mode';
// import * as V from 'victory';

var styles = {
    contributers: {
        // float:"left",
        marginRight: "1%"
    },
    mode: {
        // float:"left",
        marginRight: "1%",
        marginTop:"10%"
    },
    attrbar: {
        // marginLeft: "1%",
        // marginRight: "1%",
        height:"auto"
    },
    helper: { overflow: "visible", padding:0, marginTop:"2%", height:"auto" },
    keybar: {
        float: "left",
        // display: "inline-block",
        marginLeft: "1%",
        marginRight: "1%"
    },
    timebar: {
        float: "left",
        // display: "inline-block",
        marginLeft: "1%",
        marginRight: "1%"
    }
}


export default class Data extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // var paperChildren = (
        // <div>
        //     <h4>{this.props.data.name}</h4>
        //     <h6>Owner: <a href={this.props.data.owner.external_urls.spotify}>{this.props.data.owner.display_name}</a> </h6>
        // </div>);

        return (
            // <Paper children={paperChildren} />
            <div>
                <h4>{this.props.data.name}</h4>
                <h6 style={{margin:3}}>Owner: <a href={this.props.data.owner.external_urls.spotify}>{this.props.data.owner.display_name}</a></h6>
                <br/>
                <Attrbar data={this.props.data.track_attributes} style={styles.attrbar}/>
                <div style={styles.helper}>
                    <div style={{float:"left", marginRight:"1%"}}>
                        <Contributers data={this.props.data.contributers} style={styles.contributers}/>
                        <Mode data={this.props.data.mode_data} style={styles.mode}/>
                    </div>
                    <Keybar data={this.props.data.key_data} style={styles.keybar} />
                    <Timebar data={this.props.data.time_data} style={styles.timebar} />
                </div>
                
            </div>
        );
    }
}