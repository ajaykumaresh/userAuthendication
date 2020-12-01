import axios  from "axios";

export const accessValidation=()=>{
   return axios.get('/api/validation')
            .then(response=>response.data)
            .catch(err=>console.error(err))
    
}
export const fetchUser =()=>{
    return axios.get('/api/fetchUser')
     .then(response=>response.data)
     .catch(err=>console.error(err))
}

export const sendEmail=()=>{
    return axios.get('/api/sendEmail')
     .then(response=>response.data)
     .catch(err=>console.error(err))
}
