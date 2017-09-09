import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';

// descriptions = [

// ]


export default class Attrbar extends React.Component {

    render () {
        let data = [];
        var categories = Object.keys(this.props.data);
        console.log(categories);
        for (var i = 0; i < categories.length; i++) {
            if (categories[i] !== "tempo" && categories[i] !== "duration_ms" && categories[i] !== "loudness") {
                data.push({x: categories[i], y: this.props.data[categories[i]], label: ""}) 
            }
        }

        console.log(data);

        return (
            <div style={this.props.style}>
                <Card>
                    <CardHeader 
                        title="Averages"
                        subtitle={"Loudness: "+Math.round((this.props.data.loudness * 100))/100 +" db   |   Tempo: "+Math.round((this.props.data.tempo * 100))/100+" bpm   |   Song length: "+Math.floor(this.props.data.duration_ms/60000)+" min "+Math.round(((this.props.data.duration_ms/60000)%1) * 60)+" sec" }
                    />
                    <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    padding={{ left: 120, bottom: 50, right:50 }}
                    height={250}
                    width={600}
                    >
                        <VictoryBar
                        horizontal={true}
                        domain={{x: [0,1]}}
                        data={data}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        labels={(d) => {
                            "| "+d.x*100 + "%";
                        }}
                        />
                    </VictoryChart>
                </Card>
            </div>
        );
    }
}
