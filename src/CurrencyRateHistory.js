import React,{useState,useEffect}from  'react';
import { Form,Button,FormGroup} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import axios from "axios";

const CurrencyRateHistory = () => {

    const[chartData, setChartData] = useState({})

    const [currencyDate,setCurrencyDate] = useState({})
    const [currencyRate,setCurrencyRate] = useState({})

    const chart = () => {
        let currencyDate = [];
        let currencyRate = [];

        //var conversionUrl = 'http://localhost:50409/currency/convertion/history?curencyCode='+currencyCode+"&fromdate="+fromDate+"&todate="+toDate;
        fetch("http://localhost:50409/currency/convertion/history?curencyCode=NOK&fromdate=2021-02-12")
        .then(response => response.json())
        .then((result)=>{
            console.log(result)
            for(const data of result){
                currencyDate.push(data.date);
                currencyRate.push(data.rate);
            }
            setChartData({
                labels:currencyDate,
                datasets:[
                    {
                        label: 'currency rate',
                        data: currencyRate,
                        backgroundColor:['rgba(54,158,173,.7)'],
                        borderWidth:4
                    }
                ]
            })
        },
        (error)=>{
            alert("Failed");
        });

        // axios.get("http://localhost:50409/currency/convertion/history?curencyCode=NOK&fromdate=2021-02-12")
        // .then(res=>{
        //     console.log(res);
        //     for(const data of res.data.data){
        //         currencyDate.push(data.date);
        //         currencyRate.push(data.rate);
        //     }
        //     setChartData({
        //         labels:currencyDate,
        //         datasets:[
        //             {
        //                 label: 'currency rate',
        //                 data: currencyRate,
        //                 backgroundColor:['rgba(54,158,173,.7)'],
        //                 borderWidth:4
        //             }
        //         ]
        //     })
        // })
        // .catch(err=>{
        //     alert(JSON.stringify(err));
        // })
        //console.log(currencyDate,currencyRate);        
    }
    
    useEffect(()=>  {
        chart()
    },[])
    return(
        <div className="container">
            <h4 className="m-3 d-flex justify-content-left">Currency Exchange Rate History</h4>
            <Form>
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
                <Line data={chartData}/>
            </div>                                
        </div>            
    )  
}

export default CurrencyRateHistory;
