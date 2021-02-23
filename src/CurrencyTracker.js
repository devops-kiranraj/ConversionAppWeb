import React,{Component} from  'react';
import { Form,Button,FormGroup} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';

export class CurrencyTracker extends Component {
    constructor(props){
        super(props);

        this.state = {
                chartData:{}
         };
         this.getHistory =this.getHistory.bind(this);
         this.LoadData =this.LoadData.bind(this);
    }

    getHistory(event){        
        let currencyDate = [];
        let currencyRate = [];
        event.preventDefault();
        var currencyCode = event.target.Currency.value;
        var fromDate = event.target.FromDate.value;
        var toDate = event.target.ToDate.value;
        var conversionUrl = 'http://localhost:50409/currency/convertion/history?curencyCode='+currencyCode+"&fromdate="+fromDate+"&todate="+toDate;        
        fetch(conversionUrl)
        .then(response => response.json())
        .then((result)=>{            
            for(const data of result){
                currencyDate.push(data.date);
                currencyRate.push(data.rate);
            }
            console.log(currencyDate);
            console.log(currencyRate);
            this.LoadData(currencyDate,currencyRate);            
        },
        (error)=>{
            alert("Failed");
        });
    }

    LoadData(currencyDate,currencyRate){
        this.setState({
            chartData:{
                labels:currencyDate,
                datasets:[
                    {
                        label: 'currency rate',
                        data: currencyRate,
                        backgroundColor:['rgba(54,158,173,.7)'],
                        borderWidth:4
                    }
                ]
            }
        })
    }

    render()
    {
        return(
            <div className="container">
                <h4 className="m-3 d-flex justify-content-left">Currency Exchange Rate History</h4>
                <Form onSubmit={this.getHistory}>
                    <FormGroup controlId="Currency">
                        <Form.Label>Currency</Form.Label>
                        <Form.Control type="text" name="Currency" required placeholder="Currency Code"/>
                    </FormGroup>
                    <FormGroup controlId="FromDate">
                        <Form.Label>FromDate</Form.Label>
                        <Form.Control type="date" name="FromDate" required placeholder="FromDate"/>
                    </FormGroup>
                    <FormGroup controlId="ToDate">
                        <Form.Label>ToDate</Form.Label>
                        <Form.Control type="date" name="ToDate" placeholder="ToDate"/>
                    </FormGroup>
    
                    <FormGroup>
                        <Button variant="primary" type="submit">
                           Show Details
                        </Button>
                    </FormGroup>
                </Form> 
                
                <div style={{height:"200px"}}>
                    <Line data={this.state.chartData}/>
                </div>                                
            </div>            
        ) 
    }

}

