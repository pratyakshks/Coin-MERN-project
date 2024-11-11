import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default class GraphSingle extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';


  render() {
    const data3 = 
     [
      {name: '24hr', PriceChange: this.props.data.price_change_percentage_24h },
      {name: '7d', PriceChange: this.props.data.price_change_percentage_7d },
      {name: '14d', PriceChange: this.props.data.price_change_percentage_14d },
      {name: '30d', PriceChange: this.props.data.price_change_percentage_30d },
      {name: '60d', PriceChange: this.props.data.price_change_percentage_60d },
      {name: '1yr', PriceChange: this.props.data.price_change_percentage_1y }
    ]


    return (
      <BarChart
        width={350}
        height={250}
        data={data3}
        margin={{
          top: 5, right: 10, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis unit="%" />
          <Label value="%" position="insideTopLeft" offset={10} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="PriceChange" fill="rgb(102, 153, 204)" barSize={20}/>
      </BarChart>
    );
  }
}
