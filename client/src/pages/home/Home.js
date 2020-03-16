import React,{Component} from "react";
import {Button, Container, Form} from "react-bootstrap";
// import {Flex, Item} from "react-flex/src";
import Patient from "../Patient/Patient";
import Data from '../data/data.js'
import {FhirClientContext} from "../../FhirClientContext";
import FhirClientProvider from "../FhirClientProvider/fhirClientProvider";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            patient_id:null
        }
    }
    getPatientID(e){
        e.preventDefault()
        console.log(this.state.patient_id);
    }
    render() {
        return(
            <FhirClientProvider>
                <Patient />
                <div>
                    <Data />
                </div>
            </FhirClientProvider>
        );
    }

}


export default Home;
