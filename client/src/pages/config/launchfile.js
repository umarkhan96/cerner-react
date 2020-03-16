import React,{Component} from "react";
import {Button, Container, Form} from "react-bootstrap";
// import {Flex, Item} from "react-flex/src";
const fhirclient = require('fhirclient')
class Launch extends Component {
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
    componentDidMount() {
        fhirclient.oauth2.authorize({
            "client_id": "my_web_app",
            "scope": "patient/*.read"
        });
    }

    render() {
        return(
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Patient's ID</Form.Label>
                        <Form.Control type={"text"} placeholder={"Patient's ID"}
                                      onChange={(e)=>{
                                          const id=e.target.value;
                                          this.setState({patient_id:id});
                                      }} />
                    </Form.Group>
                    <Button variant={'primary'} type={'submit'} onClick={(e)=>{this.getPatientID(e)}} >Submit</Button>

                </Form>


            </Container>
        );
    }

}


export default Launch;
