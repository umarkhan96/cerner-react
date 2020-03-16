import React, {Component} from "react";
import {FhirClientContext} from "../../FhirClientContext";
import {client} from "fhirclient";


export default class Data extends Component{
    static contextType= FhirClientContext;
   constructor(props) {
       super(props);
       this.state={
            bp:undefined
       }
   }
    componentDidMount() {
       this.loadData()
    }

    loadData(){
       const client = this.context.client;
       const q = new URLSearchParams();
       q.set("code","https://lonic.org|10173-3");
       q.set("subject", client.patient.id);
       client
           .request(`Observations${q}`,{
               pageLimit:0,
               flat:true
           })
           .then(bp=>{
               console.log(bp);
               this.setState({bp})
           })
   }

   render() {
       if(this.state.bd){
           return "Hello World";
       }
       return null;
   }


}
