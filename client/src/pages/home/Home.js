import React,{Component} from "react";
import Patient from "../Patient/Patient";
import Data from '../data/data.js'
import FhirClientProvider from "../FhirClientProvider/fhirClientProvider";

class HomeOld extends Component {
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


export default HomeOld;
