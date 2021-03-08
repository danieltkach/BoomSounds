import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import { setUserRole } from "../../redux/users/actions"
function ProtectedRoute({ Component, userRole }){
if(userRole && userRole !== "admin"){
return <Redirect to="/"/>
}else{
console.log(userRole)
return <Component />
}
}
const mapStateToProps = (state) => {
    return {
        userRole: state.users.userRole 
    }
}


export default connect(mapStateToProps,{ setUserRole })(ProtectedRoute)