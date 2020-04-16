import React,{Component} from "react";
import {oauth2 as SMART} from "fhirclient";


export default class Launcher extends Component{
    componentDidMount() {
        SMART.authorize({
            clientId:"d3ea1926-228b-4d96-8e86-f1b419aa1cb0",
            scope:'patient/Patient.read patient/Observation.read patient/AllergyIntolerance.read patient/Appointment.read launch/patient online_access openid profile',
            redirectUri:"/data",
            iss:"https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca",
            completeInTarget:true
        })
    }

    render() {
        return "Launching...";
    }
}
