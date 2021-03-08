import React, { useEffect , useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown , faBan} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux'
import {promote , demote , ban} from '../../redux/users/actions'

const UsersTable = ({user, promote, demote, ban}) => {
   

    return(
        <tr>
            <td>{user.email}</td>
            <td>{user.role}</td>
            {user.role === 'admin' ?
                <td>
                    <button onClick={()=>demote(user.id)}><FontAwesomeIcon className='icon' icon={faArrowDown}/></button>
                </td> :
                user.role === 'user' ?
                <td>
                <button onClick={()=>promote(user.id)}><FontAwesomeIcon className='icon' icon={faArrowUp}/> </button> 
                <button onClick={()=>ban(user.id)}><FontAwesomeIcon className='icon' icon={faBan}/> </button> 
                </td> : '' 
                
            }
        </tr>
    )
}

const mapStateToProps = (state) =>{
    return{
       users: state.users}
}
export default connect(mapStateToProps,{promote ,demote, ban})(UsersTable)