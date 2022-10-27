export interface Action{
    type:string,
    payload:any
}

const isAuthenticated = { loggedIn:false};
export function reducers(state= isAuthenticated, action:Action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...action.payload,
                loggedIn:true
            }
        case 'LOGOUT':
            return{
                loggedIn:false
            }
        default:
            return state;
    }
}