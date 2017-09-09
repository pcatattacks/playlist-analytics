import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';

export default class Mode extends React.Component {
    render() {
        return (
            <div style={this.props.style}>
            <Card>
                <CardTitle
                title={<span>{this.props.data.major} <h6>songs in major Key</h6></span>}
                />
                <CardTitle
                title={<span>{this.props.data.minor} <h6>songs in minor Key</h6></span>}
                />
            </Card>
            </div>
        );
    }
}