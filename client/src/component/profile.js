import React, { Component, useEffect, useState } from 'react';
import {accessValidation } from './service';
const  Profile= (props)=> {
    const [profileName,changeProfile]= useState({
        profile:""
    })

    useEffect(()=>{
        async function fetchData() {
            let responce=await accessValidation()
             console.log(responce)
        changeProfile({
            profile:responce.name
        })
    }
    fetchData();
    },[])
 
    return(
        <div>welcome from {profileName.profile}</div>
    )
    }
    export default Profile