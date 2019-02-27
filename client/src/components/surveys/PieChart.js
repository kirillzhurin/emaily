import React from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends React.Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  
  componentDidMount() {
    const { yes, no, pending } = this.props.data;
    
    this.createPie([
      { "category": "Yes", "value": yes }, 
      { "category": "No", "value": no }, 
      { "category": "Pending", "value": pending}, 
     ]);
  }
  
  createPie(data) {

    let container = am4core.create(this.containerRef.current, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    
    let chart = container.createChild( am4charts.PieChart);
    chart.data = data;

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.colors.list = [
      am4core.color("#66B92E"),
      am4core.color("#D65B4A"),
      am4core.color("#CCCCCC")
    ];
    pieSeries.slices.template.stroke = am4core.color("#fff");
    this.chart = chart;
  }

  render() {
    return <div ref={this.containerRef} style={{ width: '50px', height: '50px' }}></div>
  }
}

export default PieChart;