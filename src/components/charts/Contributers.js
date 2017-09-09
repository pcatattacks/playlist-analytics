import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const style = {
    display: "inline-block"
}

export default class Contributers extends React.Component {

    render() {
         // still need to sort
        let listItems = [];
        let count;
        for (var key in this.props.data) {
            count = <span>{this.props.data[key].number} contributions</span>;
            listItems.push(
                <ListItem primaryText={key}
                    secondaryText={count}
                    onClick={(e) => {window.open(this.props.data[key].data.external_urls.spotify);}}
                />
            );
            console.log(key);   // debugging statement
        }
            
        return (
            <div style={this.props.style}>
                <Card>
                    <CardHeader
                        title="Contributers"
                    />
                    <List>
                        {listItems}
                    </List>
                </Card>
            </div>
        );
    }
}