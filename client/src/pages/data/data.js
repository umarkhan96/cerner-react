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
       // client.request(`Patient/${client.patient.id}`).then(res=>{
       //     console.log(res);
       // })
       const q = new URLSearchParams();
       // q.set("code","https://loinc.org|8903-7");
       q.set("subject", client.patient.id);
       client
           .request(`Observation?${q}`,{
               pageLimit:10,
               flat:true
           })
           .then(bp=>{
               console.log(bp);
               this.setState({bp})
           })
   }

   render() {
       const list=[];
       const GaitValues =[];
       const BloodPressure=[];
       const HeartRate=[];
       const RespiratoryRate=[];
       const Temperature=[];
       BloodPressure.push(<><b>Blood Pressure TimeLine</b> <br /></>)
       HeartRate.push(<><b>Heart Rate Timeline</b> <br /></>)
       HeartRate.push(<><b>Reference Range: </b>{'60-100 bpm'} <br /></>)
       RespiratoryRate.push(<><b>Respiratory Rate Timeline</b> <br /></>)
       RespiratoryRate.push(<><b>Reference Range: </b>{'14-20 br/min'} <br /></>)
       Temperature.push(<><b>Oral Temperature Timeline</b> <br /></>)
       Temperature.push(<><b>Reference Range: </b>{'34.00-37.40 Deg Celsius'} <br /></>)
       if(this.state.bp){
           GaitValues.push(<><b>Gait: </b><br/></>)
           this.state.bp[17].component.map((item) => {
               GaitValues.push(
                   <>
                       <b>{item.valueCodeableConcept.coding && item.valueCodeableConcept.coding[0].display+':'} </b> {item.valueCodeableConcept.text} {' '}
                   </>
               )
           });
           this.state.bp.map((item,index)=>{
               if(index===135 || index===153 || index===159 || index===170 || index===175 || index===180 || index===185){
                   let date = new Date(item.effectiveDateTime);
                   BloodPressure.push(
                       <>
                           {item.component[0].valueQuantity.value}/{item.component[1].valueQuantity.value}{' '}(<b>{item.interpretation.text}</b>)
                           <br />
                           {date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}, Time: {date.getHours()+':'+date.getMinutes()}
                           <br /><br />
                       </>
                   )
               }
               if(index===156 || index===161 || index===167 || index===172 || index===177 || index===182){
                   let date = new Date(item.effectiveDateTime);
                   HeartRate.push(
                       <>
                           {item.valueQuantity.value}{' '}(<b>{item.interpretation.coding[0].display}</b>)
                           <br />
                           {date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}, Time: {date.getHours()+':'+date.getMinutes()}
                           <br /><br />
                       </>
                   )
               }
               if(index===133 || index===151 || index===158 || index===163 || index===169 || index===174 || index===179 || index===184){
                   let date = new Date(item.effectiveDateTime);
                   RespiratoryRate.push(
                       <>
                           {item.valueQuantity.value}{' '}(<b>{item.interpretation.coding[0].display}</b>)
                           <br />
                           {date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}, Time: {date.getHours()+':'+date.getMinutes()}
                           <br /><br />
                       </>
                   )
               }
               if(index===132 || index===150 || index===157 || index===162 || index===168 || index===173 || index===178 || index===183){
                   let date = new Date(item.effectiveDateTime);
                   Temperature.push(
                       <>
                           {item.valueQuantity.value}{' '+item.valueQuantity.unit}{' '}(<b>{item.interpretation.coding[0].display}</b>)
                           <br />
                           {date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}, Time: {date.getHours()+':'+date.getMinutes()}
                           <br /><br />
                       </>
                   )
               }
               list.push(
                   <div>
                       {index}. <b>Text :</b>{item.code.text}
                       <hr />
                   </div>
               )

           })
       }
      return(
          <>
              {
                  this.state.bp ?
                  <div>
                      {list}
                     <h3>Neurological</h3>
                      <b>{this.state.bp[21].code.text}:</b> {this.state.bp[21].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[19].code.text}:</b> {this.state.bp[19].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[62].code.text}:</b> {this.state.bp[62].valueCodeableConcept.text}{'  '}
                      <b>{this.state.bp[64].code.text}:</b> {this.state.bp[64].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[90].code.text}:</b> {this.state.bp[90].valueQuantity.value}
                      <hr />
                      <h3>Cardiovascular</h3>
                      <b>{this.state.bp[71].code.text}:</b> {this.state.bp[71].valueCodeableConcept.text} {'  '}
                      <b>{this.state.bp[72].code.text}:</b> {this.state.bp[72].valueCodeableConcept.text}
                      <br/>
                      <b>{this.state.bp[74].code.text}:</b> {this.state.bp[74].valueCodeableConcept.text}{'  '}
                      <b>{this.state.bp[75].code.text}:</b> {this.state.bp[75].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[85].code.text}:</b> {this.state.bp[85].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[86].code.text}:</b> {this.state.bp[86].valueCodeableConcept.text}
                      <hr />
                      <h3>Respiratory</h3>
                      <b>{this.state.bp[91].code.text}:</b> {this.state.bp[91].valueCodeableConcept.text} {'  '}
                      <b>{this.state.bp[92].code.text}:</b> {this.state.bp[92].valueCodeableConcept.text}
                      <br/>
                      <b>{this.state.bp[93].code.text}:</b> {this.state.bp[93].valueCodeableConcept.text}{'  '}
                      <b>{this.state.bp[94].code.text}:</b> {this.state.bp[94].valueCodeableConcept.text}
                      <br />
                      <b>{this.state.bp[80].code.text}:</b> {this.state.bp[80].valueCodeableConcept.text}
                      <hr />
                      <b>Can not find Effort</b>
                      <hr />
                      <b>Can not find Oxygen</b>
                      <hr />
                      <b>{this.state.bp[70].code.text}:</b> {this.state.bp[70].valueCodeableConcept.text}
                      <hr />
                      <h3>Gastrointestinal</h3>
                      <b>Can not find Diet</b>
                      <hr />
                      <b>{this.state.bp[98].code.text}:</b> {this.state.bp[98].valueString}
                      <hr />
                      <b>{this.state.bp[68].code.text}:</b> {this.state.bp[68].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[81].code.text}:</b> {this.state.bp[81].valueCodeableConcept.text} {'  '}
                      <b>{this.state.bp[82].code.text}:</b> {this.state.bp[82].valueCodeableConcept.text}
                      <br/>
                      <b>{this.state.bp[83].code.text}:</b> {this.state.bp[83].valueCodeableConcept.text}{'  '}
                      <b>{this.state.bp[84].code.text}:</b> {this.state.bp[84].valueCodeableConcept.text}
                      <hr />
                      <h3>Genitourinary</h3>
                      <b>{this.state.bp[20].code.text}:</b> {this.state.bp[20].valueCodeableConcept.text}
                      <hr />
                      <h3>Integumentary</h3>
                      <b>{this.state.bp[25].code.text}:</b> {this.state.bp[25].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[24].code.text}:</b> {this.state.bp[24].valueCodeableConcept.text}
                      <hr />
                      <b>{this.state.bp[100].code.text}:</b> {this.state.bp[100].valueCodeableConcept.text}{'  '}
                      <b>{this.state.bp[101].code.text}:</b> {this.state.bp[101].valueCodeableConcept.text}
                      <hr />
                      <h3>Musculoskeletal</h3>
                      {GaitValues}
                      <hr />
                      <b>{this.state.bp[11].code.text}:</b> {this.state.bp[11].valueQuantity.value}
                      <hr />
                      <h3>LABS</h3>
                      <b>{this.state.bp[106].code.text}:</b> {this.state.bp[106].valueQuantity.value+' '+this.state.bp[106].valueQuantity.unit}{', '}
                      <b>{this.state.bp[105].code.text}:</b> {this.state.bp[105].valueQuantity.value+' '+this.state.bp[105].valueQuantity.unit}{', '}
                      <b>{this.state.bp[110].code.text}:</b> {this.state.bp[110].valueQuantity.value+' '+this.state.bp[110].valueQuantity.unit}
                      <hr />
                      <b>{this.state.bp[107].code.text}:</b> {this.state.bp[107].valueQuantity.value+' '+this.state.bp[107].valueQuantity.unit}{', '}
                      <b>{this.state.bp[109].code.text}:</b> {this.state.bp[109].valueQuantity.value+' '+this.state.bp[109].valueQuantity.unit}{', '}
                      <b>{this.state.bp[102].code.text}:</b> {this.state.bp[102].valueQuantity.value+' '+this.state.bp[102].valueQuantity.unit}{', '}
                      <b>{this.state.bp[114].code.text}:</b> {this.state.bp[114].valueQuantity.value+' '+this.state.bp[114].valueQuantity.unit}{', '}
                      <b>{this.state.bp[104].code.text}:</b> {this.state.bp[104].valueQuantity.value+' '+this.state.bp[104].valueQuantity.unit}{', '}
                      <b>{this.state.bp[115].code.text}:</b> {this.state.bp[115].valueQuantity.value+' '+this.state.bp[115].valueQuantity.unit}{', '}
                      <b>{this.state.bp[128].code.text}:</b> {this.state.bp[128].valueCodeableConcept.text}{', '}
                      <b>{this.state.bp[139].code.text}:</b> {this.state.bp[139].valueCodeableConcept.text}
                      <hr />
                      <b>PT not found, PTT not found, INR not found</b>
                      <hr />
                      <b>{this.state.bp[103].code.text}:</b> {this.state.bp[103].valueQuantity.value+' '+this.state.bp[103].valueQuantity.unit}{', '}
                      <b>{this.state.bp[112].code.text}:</b> {this.state.bp[112].valueQuantity.value+' '+this.state.bp[112].valueQuantity.unit}{', '}
                      <b>{this.state.bp[111].code.text}:</b> {this.state.bp[111].valueQuantity.value+' '+this.state.bp[111].valueQuantity.unit}
                      <hr />
                      <h3>Vital Signs</h3>
                      {BloodPressure}
                      <hr />
                      {HeartRate}
                      <hr />
                      {RespiratoryRate}
                      <hr />
                      <b>Oxygen Saturation not found</b>
                      <hr />
                      {Temperature}
                      <hr />
                      <h3>Intake/Output</h3>
                      <b>{this.state.bp[96].code.text}:</b> {this.state.bp[96].valueQuantity.value+' '+this.state.bp[96].valueQuantity.unit}
                      <hr />
                  </div> :
                  <div>
                    Loading.....
                  </div>
              }
          </>
      )
   }


}
