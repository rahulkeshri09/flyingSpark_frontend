import { ADD_USER_DATA,REMOVE_USER } from "../action";
//initial state
const initialState={
    user:false
}
export default function user(state=initialState,action){
    switch(action.type){
        case ADD_USER_DATA:
            return{
                ...state,
                user:true,
                userData:action.user
            }
        case REMOVE_USER:
            return{
                user:false
            }
        default:
            return state;
    }
}