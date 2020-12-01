import axios  from "axios";
import {API_ADD_USER} from "./type";
export const signupEvent=(body)=>{
    return (dispatchEvent)=>{
        console.log(body)
        axios({
            url: 'api/signup',
            method: "POST",
            data: body.data,
            headers: body.headers
        })
            .then(response=>dispatchEvent(getApiCollectionsAction(response.data)))
            .catch(err=>console.error(err))
    }
}

export const signinEvent=(body)=>{

    return (dispatchEvent)=>{
    axios({
        url: 'api/signin',
        method: "POST",
        data: {
            username:body.email
        },
        headers: {
            "Authorization": `Basic ${btoa(`${body.email}:${body.password}`)}`
        }
    })
    .then(response=>dispatchEvent(getApiCollectionsAction(response.data)))
    .catch(err=>console.error(err))
}
}

export const accessValidation=(paramRequest)=>{
    return (dispatchEvent)=>{
            axios.get('/api/validation')
            .then(response=>dispatchEvent(getApiCollectionsAction(response.data)))
            .catch(err=>console.error(err))
    }
}

export const getApiCollectionsAction=(response)=>{
    console.info(response)
    return{
        type:API_ADD_USER,
        payload:response
    }
}