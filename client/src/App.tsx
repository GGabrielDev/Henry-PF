import { AuthContext } from "./components/Login/Auth";
import Router from "./Router/Router";
import {useReducer} from "react";
import { reducers } from "./redux/reducer";
const init = ()=>{
  let sessionUser:any = sessionStorage.getItem('user');
  let user:any;
  if(!sessionUser){
    user=sessionUser;
  }else{
    user= JSON.parse(sessionUser)
  }
}
function App() {
  const [user, dispatchUser]=useReducer(reducers, {}, init)
  return (
    <div className="App">
      <AuthContext.Provider value={{user, dispatchUser}}>
      <Router></Router>
      </AuthContext.Provider>
    </div>

  );
}

export default App;
