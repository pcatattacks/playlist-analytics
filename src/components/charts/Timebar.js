import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

export default class Timebar extends React.Component {

    render() {

        let data = [];
        let categories = Object.keys(this.props.data);
        for (let i = 0; i < categories.length; i++) {
            data.push({x: categories[i], y:this.props.data[categories[i]]});
        }

        // console.log(data)

        return (
            <div style={this.props.style}>
                <Card>
                    <CardHeader 
                        title="Time Signature Data"
                        subtitle="Y-axis in number of songs, X-axis specifying meter"
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