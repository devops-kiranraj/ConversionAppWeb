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
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    convertCurrency(event){
        event.preventDefault();
        var conversionUrl = 'http://localhost:50409/currency/convert/';

        const qs = require('querystring');
        
        const currencyConverterRequest = {
            SourceCurrency:event.target.SourceCurrency.value,
            TargetCurrency:event.target.TargetCurrency.value,
            Amount:event.target.Amount.value,
        }
        
        console.log(currencyConverterRequest);

        alert(JSON.stringify(currencyConverterRequest));
        fetch(conversionUrl,{
            method:"POST",
            headers:{   'Content-Type':'application/json'  },
            data:qs.stringify(currencyConverterRequest)
        })
        .then(response => response.json())
        .then((result)=>{
            alert(JSON.stringify(result));           
        },
        (error)=>{
            alert(JSON.stringify(error));
            this.setState({                
                ErrorMessage:error.statusMessage,
            });
            
        });
    }
    render(){        
        return(
            <div>               
               <h4 className="m-3 d-flex justify-content-left">Currency Conversion Screen</h4>

               <h6 color="red" className="justify-content-right">{this.state.ErrorMessage}</h6>
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
            </div>
        )
    }
}