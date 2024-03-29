import React from 'react'
import {connect} from 'react-redux'
import { update_user } from '../config/store/action';
import {IoMdLogOut, IoIosPrint} from 'react-icons/io'

class Header extends React.Component{
    render(){
        return(
            <div className={'header'}>
                 <div className={'logo'}>
                    <img src={require('../assets/images/logo.png')} style={{ width: 150 }} />
                </div>

                <div style={{position:'absolute', top:20, right:10, display:"flex"}}>
                {this.props.report && <button className={'printBtn'} onClick={() => {
                        window.print()

                    }}>
                        <IoIosPrint size={24} style={{ marginRight: "4px" }} /> Print
                    </button>}
                    <button className={'logoutBtn'} onClick={() => { 
                        this.props.store_user(null)

                         }}>
                        <IoMdLogOut size={24} style={{marginRight:"4px"}} /> Logout
                    </button>
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
  
  export default connect(null,mapDispatchToProps)(Header)