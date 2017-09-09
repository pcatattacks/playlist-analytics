import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const playlistRegex = /\bhttp[s]*:\/\/open.spotify.com\/user\/\w+\/playlist\/\w+/;

export default class Inputbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            validURL: true,
            disableButton: true,
            value: null
        };
    }

    isValidPlaylistURL = (text) => {
        return playlistRegex.test(text);  // if valid url format
    }

    handleChange = (event, value) => {
        if ((this.isValidPlaylistURL(value) )) {
            this.setState({validURL: true, value:value, disableButton: false});
        } else {
            this.setState({validURL: false, value:value, disableButton: true});
        }
    };

    render() {
        return (
        <div>
            <TextField
                hintText="Enter Spotify Playlist URL"
                fullWidth={true}
                onChange={this.handleChange}
                errorText={this.state.validURL || this.state.value=== ""? null: "Invalid playlist URL format"}
            />
            <br/>
            <RaisedButton label="Get Analytics" fullWidth={true} secondary={true}
                disabled={this.state.disableButton}
                onClick={this.props.onClick} />
        </div>
        );
    }
}