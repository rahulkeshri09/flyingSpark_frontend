export const ADD_USER_DATA="ADD_USER_DATA";
export const REMOVE_USER="REMOVE_USER"
export function addUser(user){
    return{
        type:ADD_USER_DATA,
        user
    }
}
export function removeUser(){
    return{
        type:REMOVE_USER,
    }
}