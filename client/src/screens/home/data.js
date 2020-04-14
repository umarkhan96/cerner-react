import React , {Component} from "react";
import Header from "../header";
import {FhirClientContext} from "../../FhirClientContext";
import {Spin} from "antd";
import moment from "moment";
export default class Data extends Component{
    static contextType= FhirClientContext;
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            loadingPatient:true,
            patient:null,
            error:null,
            bp:undefined,
        }
    }
    componentDidMount() {
       this.loadData();

    }
    loadData(){
        const client = this.context.client;
        console.log('client: ',client);
        this._loader=client.patient
            .read()
            .then(patient=>{
                console.log(patient);
                this.setState({patient,loadingPatient:false,error:null})
            })
            .catch(error=>{
                this.setState({error,loadingPatient:false})
            })
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
                this.setState({bp,loading:false})
            })
    }
    PatientName(name){
        let entry=
            name.find(nameRecord=>nameRecord.use==="official") || name[0];
        if(!entry){
            return 'No Name'
        }
        return entry.given.join(" ")+" "+entry.family;
    }

    render() {
        const GaitValues = [];
        const {error, loading,loadingPatient, patient} = this.state;
        if(error){
            return error.message;
        }
       if(this.state.bp){
           GaitValues.push(<>Gait: <br/></>)
           this.state.bp[17].component.map((item) => {
               GaitValues.push(
                   <>
                       {item.valueCodeableConcept.coding && item.valueCodeableConcept.coding[0].display+':'} <span>{item.valueCodeableConcept.text}</span> <br/>
                   </>
               )
           });
       }
        return(
            <div className={'formContainer'}>
                <Header/>
                {loading===false && loadingPatient===false ? <div className={'reportContainer'}>
                    <p className={'reportHead'}>Patient's Database in Report Sheet Format</p>

                    <div>
                        <table>


                            <tr>
                                <td><span>{this.PatientName(patient.name)}</span></td>
                                <td>Age: <span>{moment().diff(patient.birthDate, 'years')}</span></td>
                                <td>Sex: <span>{patient.gender}</span></td>
                                <td>Room #: <span></span></td>
                                <td></td>
                                <td>
                                    Code Status: <span></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5">Allergies: <span></span></td>
                                <td>Presiding Physician: <span></span></td>
                            </tr>
                            <tr>
                                <td colSpan={"5"}></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    Admitting Diagnosis:
                                    <br/>
                                    <span>Pnumonia/Spesis</span>
                                </td>
                                <td colSpan="2">
                                    History:
                                    <br/>

                                    <span></span>
                                </td>

                                {/* Elements Box */}

                                <td colSpan="2">
                                    Labs:

                                    <div className={'elementsContainer'}>

                                        {/* Upper top 2 Shapes Box */}
                                        <div className={'elementsBox1'}>

                                            <div className={'shape1'}>
                                                <div>
                                                    <p className={'b1'}>
                                                        {this.state.bp[106].valueQuantity.value+' '+this.state.bp[106].valueQuantity.unit}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={'b2'}>{this.state.bp[105].valueQuantity.value+' '+this.state.bp[105].valueQuantity.unit}</p>
                                                    <p className={'b3'}>HCT</p>
                                                </div>
                                                <div>
                                                    <p className={"b4"}>{this.state.bp[110].valueQuantity.value+' '+this.state.bp[110].valueQuantity.unit}</p>
                                                </div>
                                            </div>

                                            <div className={'shape2'}>

                                                <div>
                                                    <p className={'b2'}>{this.state.bp[103].valueQuantity.value+' '+this.state.bp[103].valueQuantity.unit}</p>
                                                    <p className={'b3'}>{this.state.bp[112].valueQuantity.value+' '+this.state.bp[112].valueQuantity.unit}</p>
                                                </div>
                                                <div>
                                                    <p className={"b4"}>{this.state.bp[111].valueQuantity.value+' '+this.state.bp[111].valueQuantity.unit}</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Upper top 2 Shapes Box End here */}

                                        {/* Bottom 2 Shapes Box */}
                                        <div className={'elementsBox2'}>

                                            <div className={'shape3'}>
                                                <div>
                                                    <div style={{display: "flex"}}>
                                                        <p className={'shape1B1'}>{this.state.bp[107].valueQuantity.value+' '+this.state.bp[107].valueQuantity.unit}</p>
                                                        <p className={'shape1B1'}>{this.state.bp[102].valueQuantity.value+' '+this.state.bp[102].valueQuantity.unit}</p>
                                                        <p className={'shape1B1'}>{this.state.bp[104].valueQuantity.value+' '+this.state.bp[104].valueQuantity.unit}</p>
                                                    </div>
                                                    <div style={{display: "flex", marginTop: "-8px"}}>
                                                        <p className={'shape1B2'}>{this.state.bp[109].valueQuantity.value+' '+this.state.bp[109].valueQuantity.unit}</p>
                                                        <p className={'shape1B2'}>{this.state.bp[114].valueQuantity.value+' '+this.state.bp[114].valueQuantity.unit}</p>
                                                        <p className={'shape1B2'}>{this.state.bp[115].valueQuantity.value+' '+this.state.bp[115].valueQuantity.unit}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className={"b4"}>{this.state.bp[128].valueCodeableConcept.text}</p>
                                                </div>
                                            </div>

                                            <div className={'shape4'}>
                                                <div>
                                                    <p className={"b1"}>PT</p>
                                                </div>
                                                <div>
                                                    <p className={'b2'}>PTT</p>
                                                    <p className={'b3'}>INR </p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Bottom 2 Shapes Box End */}

                                    </div>

                                </td>
                                {/* Elements Box End here */}

                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    General Survey:
                                </td>
                                <td colSpan={'4'}>
                                    <div className={'tdRow'}>
                                        <p>
                                            IV Site:
                                            <span></span>
                                        </p>
                                        <p>
                                            Size:
                                            <span></span>
                                        </p>
                                        <p>
                                            Date Placed:
                                            <span></span>
                                        </p>
                                    </div>
                                    <div className={'tdRow'}>
                                        <p>
                                            IVF Type:
                                        </p>
                                        <p>
                                            Rate:
                                        </p>
                                        <p>
                                            Shift Intake:
                                        </p>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    Neurological: (Cognition& Sensory)
                                    <br/>
                                    Loc: <span>{this.state.bp[21].valueCodeableConcept.text}</span>
                                    <br/>
                                    Orientaion: <span>{this.state.bp[19].valueCodeableConcept.text}</span>
                                    <br/>
                                    Puppils:
                                    <span>
                                         <b>Right:</b> {this.state.bp[62].valueCodeableConcept.text}{','}
                                        <b>Left:</b> {this.state.bp[64].valueCodeableConcept.text}
                                    </span>
                                    <br/>
                                    Glasogow Coma: <span>{this.state.bp[90].valueQuantity.value}</span>
                                </td>

                                <td colSpan={'2'}>
                                    Integumentary: (Tissue Integrity)
                                    <br/>
                                    Skin: <span>{this.state.bp[25].valueCodeableConcept.text}</span>
                                    <br/>
                                    Turgor: <span>{this.state.bp[24].valueCodeableConcept.text}</span>
                                    <br/>
                                    Mobility Braden: <span>{this.state.bp[100].valueCodeableConcept.text}</span>
                                    <br/>
                                    Activity Braden: <span>{this.state.bp[101].valueCodeableConcept.text}</span>
                                </td>

                                <td colSpan={'2'} rowSpan={'2'}>

                                    <tr>
                                        <td>
                                            Abnormal Labs
                                        </td>
                                        <td>
                                            Trends
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span></span>

                                        </td>
                                    </tr>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    Cardiovascular: (Perfusion)
                                    <br/>
                                    {this.state.bp[71].code.text}: <span>{this.state.bp[71].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[72].code.text}: <span>{this.state.bp[72].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[74].code.text}: <span>{this.state.bp[74].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[75].code.text}: <span>{this.state.bp[75].valueCodeableConcept.text}</span>
                                    <br/>

                                    Heart rhythm: <span>{this.state.bp[85].valueCodeableConcept.text}</span>
                                    <br/>
                                    Cap refill: <span>{this.state.bp[86].valueCodeableConcept.text}</span>

                                </td>

                                <td colSpan={'2'}>
                                    Musculoskeletal: (Mobility
                                    <br/>
                                    {GaitValues}
                                    Morse Fall score: <span>{this.state.bp[11].valueQuantity.value}</span>

                                </td>
                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    Respiratory: (Oxygenation)
                                    <br/>
                                    {this.state.bp[91].code.text}: <span>{this.state.bp[91].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[92].code.text}: <span>{this.state.bp[92].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[93].code.text}: <span>{this.state.bp[93].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[94].code.text}: <span>{this.state.bp[94].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[80].code.text}: <span>{this.state.bp[80].valueCodeableConcept.text}</span>
                                    <br/>
                                    Breath sounds: <span>crackles</span>
                                    <br/>
                                    Effort: <span>Not Found</span>
                                    <br/>
                                    Oxygen delivery: <span>Not Found</span>
                                    <br/>
                                    Flow rate: <span>Not Found</span>
                                    <br/>
                                    Cough: <span>{this.state.bp[70].valueCodeableConcept.text}</span>
                                </td>

                                <td colSpan={'2'}>
                                    Notes:
                                    <br/>
                                    <span></span>
                                </td>
                                <td colSpan={'2'} rowSpan={'3'}>
                                    <tr>
                                        <td colSpan={'2'}>Height: <span>/</span></td>
                                        <td>Weight: <span>/</span></td>
                                        <td>BMI: <span>/</span></td>
                                    </tr>
                                    <tr>
                                        <td>Time:</td>
                                        <td><span></span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>BP:</td>
                                        <td><span>{this.state.bp[135].component[0].valueQuantity.value}/{this.state.bp[135].component[1].valueQuantity.value}</span></td>
                                        <td><span>MAP - 67</span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>HR:</td>
                                        <td><span>{this.state.bp[156].valueQuantity.value}</span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>RR:</td>
                                        <td><span>{this.state.bp[133].valueQuantity.value}</span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>O2 Sat:</td>
                                        <td><span>/</span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>O2 Flow:</td>
                                        <td><span>/</span></td>
                                        <td><span>/</span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>Temp:</td>
                                        <td><span>{this.state.bp[132].valueQuantity.value}</span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>Pain:</td>
                                        <td><span></span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>(PO) I:</td>
                                        <td><span>{this.state.bp[96].valueQuantity.value+' '+this.state.bp[96].valueQuantity.unit}</span></td>
                                        <td><span></span></td>
                                        <td><span></span></td>

                                    </tr>
                                    <tr>
                                        <td>(Urine)O:</td>
                                        <td><span>/</span></td>
                                        <td><span></span></td>
                                        <td>Summary: <span>/</span></td>

                                    </tr>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    Gastrointestinal: (Elimination & Metabolism)
                                    <br/>
                                    Diet: <span>Not Found</span>
                                    <br/>
                                    {this.state.bp[98].code.text}: <span>{this.state.bp[98].valueString}</span>
                                    <br/>
                                    Abdomen: <span>{this.state.bp[68].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[81].code.text}: <span>{this.state.bp[81].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[82].code.text}: <span>{this.state.bp[82].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[83].code.text}: <span>{this.state.bp[83].valueCodeableConcept.text}</span>
                                    <br/>
                                    {this.state.bp[84].code.text}: <span>{this.state.bp[84].valueCodeableConcept.text}</span>
                                    <br/>

                                </td>

                                <td colSpan={'2'}>
                                    Notes:
                                    <br/>
                                    <span></span>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={'2'}>
                                    Genitourinary: (Elimination)
                                    <br/>
                                    Elimination: <span>{this.state.bp[20].valueCodeableConcept.text}</span>

                                </td>

                                <td colSpan={'2'}>
                                    Medications:
                                    <br/>
                                    <span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> :
                    <div
                        style={
                            {
                                textAlign:'center',
                                height:'100vh',
                                background:'rgba(0,0,0,0.5)'

                            }
                        }
                    >
                        <Spin size={'large'} />
                    </div>
                }
            </div>
        );
    }
}
