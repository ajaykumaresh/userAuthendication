import React, {  useEffect, useState } from 'react';
import { useAlert } from 'react-alert'
import {accessValidation,fetchUser,sendEmail } from './service';
 const Dashboard =(props)=> {
    const alert = useAlert()
     let [user,changeUser]=useState({
         data:"",
         length:0
     })
    useEffect(()=>{
        console.log(props)
        async function fetchData() {
       let responce=await accessValidation()
        console.log(responce)
        if(responce.role === "Admin"){
        let fetchreq=await fetchUser()
        console.log(fetchreq)
        changeUser({
            length:fetchreq.length,
            data:fetchreq.responseData
        })
        }
        }
        fetchData();
    },[user.data.length])

    const sendEmailNotification=async(event)=>{
        console.log(event)
        const parentElement = event.target.name;
        //props.getCollection(textContent)
        console.log(parentElement)
        // let responce=await sendEmail();
        // alert.show(responce.msg)

        //https://ethereal.email/messages
        //pass: upWAuQVjNwJG6pCgQK
        //Username: neha.kautzer@ethereal.email
    }
        
        return (
            <>
            {user.length?
            user.data.map((content, index)=>{
                return <div className="card my-3 p-3" key={index} >
                                    <div className="d-flex">
                                        <div className="mr-auto content"  >
                                        <label className="mb-2"><a className="font-weight-bold mb-0"  >{content.name}</a></label><br/>
                                        <label className="mb-2"><a className="font-weight-bold mb-0"  >{content.email}</a></label><br/>
                                        </div>
                                        <button className="btn btn-info ml-3 align-self-center" name={content.email} onClick={(e)=>sendEmailNotification(e)}> Send Email</button>
                                    </div>
                                </div>    
               })
            :<div>welcome from Dashboard</div> }
            </>
        )
    
}


export default Dashboard