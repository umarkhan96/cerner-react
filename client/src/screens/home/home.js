import React from 'react'
import { FaUserMd } from 'react-icons/fa';
import {connect} from 'react-redux';
import { update_user } from '../../config/store/action';
import Header from '../header'
class Home extends React.Component {
    render() {
        return (
            <div className={'formContainer'}>
                <Header />

                <div className={'homeContent'}>
                    <div className={'avatar'}>
                        <FaUserMd color={'#fff'} size={35} />
                    </div>
                    <p className={'welcomeText'}> Welcome to <span style={{ fontFamily: "Poppins", color: "#1896d2" }}>Cerner</span></p>
                    <div className={'divider'} />
                    <p className={'welcomeMessage'}>
                        We welcome you if it's your first visit or if it's not first time then welcome back. Cheers!
                    </p>
                    <div className={'fetchDataBtnContainer'}>
                        <button className={'fetchDataBtn'} onClick={() => { this.props.history.push('/launch') }}>
                            Fetch Data
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        store_user: (user) => dispatch(update_user(user))
    }
  }

export default connect(null, mapDispatchToProps)(Home)
