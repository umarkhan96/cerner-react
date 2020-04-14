import React from 'react'
import { update_user } from '../../config/store/action';
import {connect} from 'react-redux';
import FhirClientProvider from "../../pages/FhirClientProvider/fhirClientProvider";
import Data from "./data";

class Report extends React.Component {

    render() {
        return (
            <FhirClientProvider>
                <Data />
            </FhirClientProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
  }

export default connect(null, mapDispatchToProps)(Report)
