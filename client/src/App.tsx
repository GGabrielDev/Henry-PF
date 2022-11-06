import { AuthContext } from "./components/Login/Auth";
import Router from "./Router/Router";
import {useReducer} from "react";
import { reducers } from "./redux/reducer";
import { ShoppingCartProvider } from "./components/Tugamer/context/SoppingCartContext";
import { Provider } from "react-redux";
import {store} from "./app/store"

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
      
      <Provider store={store}>
      <ShoppingCartProvider>
      <AuthContext.Provider value={{user, dispatchUser}}>
      <Router></Router>
      </AuthContext.Provider>
      </ShoppingCartProvider>
      </Provider>
      
    </div>


)};

export default App;
