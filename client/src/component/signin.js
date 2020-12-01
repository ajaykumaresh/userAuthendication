import React, { Component, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signinEvent } from '../redux/action';
import Cookies from 'universal-cookie';
const Signin= (props)=> {
 
    useEffect(()=>{
        console.log(props.responce.responseData.data.msg)
        console.log(2343)
        const cookies = new Cookies();
        const hastoken = cookies.get('session_maintance');
        if(props.responce.responseData.data.msg==='User Created Successfully' && hastoken){
            console.log(2343)
            props.history.push('/a/dashboard');
        }
    },[props.responce])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const email=document.getElementById("email").value ;
        const password=document.getElementById("password").value ;
        //console.log(email,password)
        props.signinDetails({ email, password })
    }
  
        return (

            <div className="align-items-center container inputWidth">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label> Email:</label>
                        <input className="form-control" type="text" id="email" />
                    </div>
                    <div className="form-group">
                        <label> Password:</label>
                        <input className="form-control" type="password" id="password"  />
                    </div>
                    <button className="btn btn-primary">Signin</button>
                    <span className="hyperLink"><Link to="/signup">new user</Link></span>
                </form>
            </div>


        )
    
}

const mapStateToProps =state=>{
    return {
        responce:state
    }
}
const mapDispatchToProps =dispatch=>{
    return {
        signinDetails: (body) =>{dispatch(signinEvent(body))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Signin)