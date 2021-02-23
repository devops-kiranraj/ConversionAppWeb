import React, {Component} from  'react';
import CanvasJSReact from './assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            chartData:[{				
                type: "column",
                toolTipContent: "{y} units",
                dataPoints: [
                  {"label":"2021-02-11","y":10.28,},
                  {"label":"2021-02-12","y":10.25},
                  {"label":"2021-02-13","y":10.23},
                  {"label":"2021-02-14","y":10.20},
                  {"label":"2021-02-15","y":10.15},
                  {"label":"2021-02-16","y":10.10},
                  {"label":"2021-02-17","y":10.01},
                  {"label":"2021-02-18","y":10.12},
                  {"label":"2021-02-19","y":10.00}
                ]}],
            chartDataNew:[{				
                    type: "stepArea",
                    toolTipContent: "{y} units",
                    dataPoints: [
                      {"label":"2021-02-11","y":120},
                      {"label":"2021-02-12","y":145},
                      {"label":"2021-02-13","y":130},
                      {"label":"2021-02-14","y":120},
                      {"label":"2021-02-15","y":135},
                      {"label":"2021-02-16","y":145},
                      {"label":"2021-02-17","y":155},
                      {"label":"2021-02-18","y":165},
                      {"label":"2021-02-19","y":150},
                      {"label":"2021-02-20","y":135},
                      {"label":"2021-02-21","y":120}
                ]}]
        }
    }
    


    render(){       
        const options = {
            title: {
              text: "Conversion Rate"
            },
             data: this.state.chartData
         }
         const optionsNew = {
            title: {
              text: "Conversion Rate"
            },
             data: this.state.chartDataNew
         }
        return(
            <div >
                <p className="m-3 d-flex justify-content-left">Welcome to Currency Conversion App using Fixer.io</p>               
                <CanvasJSChart options = {options}/>
                <CanvasJSChart options = {optionsNew}/>              
            </div>
            
        )
    }
}