import React, {Component} from  'react';
import { Form,Button,FormGroup} from 'react-bootstrap';

import axios from "axios";

export class CurrencyConversion extends Component {
    constructor(props){
        super(props);
        this.state = {
            SourceCurrency:'',
            TargetCurrency:'',
            Amount:'',
            ConvertedValue:'',
            ErrorMessage:''
         };

         this.convertCurrency =this.convertCurrency.bind(this);
    }


    convertCurrency(event){
        event.preventDefault();
        var conversionUrl = 'http://localhost:50409/currency/convert';
        var souceCurrency = event.target.SourceCurrency.value;
        var targetCurrency = event.target.TargetCurrency.value;
        var amount = event.target.Amount.value;
        var date = event.target.Date.value;
        console.log(amount);

        fetch(conversionUrl,{
            method:"POST",
            headers:{   'Content-Type':'application/json;'  },
            body: JSON.stringify({
                SourceCurrency: souceCurrency,
                TargetCurrency: targetCurrency,
                Amount: parseFloat(amount),
                Date:date
            })
        })
        .then(response => response.json())
        .then((result)=>{
            this.setState({ConvertedValue:result.targetAmount});
            this.setState({ErrorMessage:result.statusMessage});                       
        },
        (error)=>{
            alert('Failed');
            console.log(error);
            this.setState({                
                ErrorMessage: "Server call Failed"
            });       
            console.log(this.state.ErrorMessage);     
        });
    }
    render(){        
        return(
            <div>               
               <h4 className="m-3 d-flex justify-content-left">Currency Conversion Screen</h4>               
               <Form onSubmit={this.convertCurrency}>
                    <FormGroup controlId="SourceCurrency">
                        <Form.Label>Source Currency</Form.Label>
                        <Form.Control type="text" name="SourceCurrency" onChange={this.changeHandler} required placeholder="Currency Code"/>
                    </FormGroup>
                    <FormGroup controlId="TargetCurrency">
                        <Form.Label>Target Currency</Form.Label>
                        <Form.Control type="text" name="TargetCurrency" onChange={this.changeHandler} required placeholder="Currency Code"/>
                    </FormGroup>
                    <FormGroup controlId="Amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" name="Amount" onChange={this.changeHandler} required placeholder="Amount"/>
                    </FormGroup>
                    <FormGroup controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="Date" onChange={this.changeHandler} placeholder="Date"/>
                    </FormGroup>
                    <FormGroup>
                        <Button variant="primary" type="submit">
                           Convert
                        </Button>
                    </FormGroup>                    
                </Form>   
               
                    <h1>{this.state.ConvertedValue}</h1>
                    <h2>{this.state.ErrorMessage}</h2>
            </div>
        )
    }
}