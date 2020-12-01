import {API_ADD_USER} from "./type";
let initalState={
    data:""
}

const BasicReducer=(state=initalState,action)=>{
   
    switch(action.type){
        case API_ADD_USER:
            
            return{
                ...state,
                data:action.payload
            }
            default:
                
                return state
    }
}

export default BasicReducer;