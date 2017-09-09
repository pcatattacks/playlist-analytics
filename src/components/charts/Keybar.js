import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

const categories = ['C','Db', 'D','Eb','E','F','F#','G','Ab','A','Bb','B'];

export default class Keybar extends React.Component {

    render() {

        let data = [];
        var keys = Object.keys(this.props.data);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
            data.push({x: categories[keys[i]], y:this.props.data[keys[i]]});
        }

        console.log(data)

        return (
            <div style={this.props.style}>
                <Card>
                    <CardHeader 
                        title="Key Signature Data"
                        subtitle="Y-axis in number of songs, X-axis specifying keys"
                    />
                    <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    >
                        <VictoryBar
                            data={data}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                        />
                    </VictoryChart>
                </Card>
            </div>
        );
    }

}