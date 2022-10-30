import Navbar from "../components/Navbar";
import { FormRegister } from "../components/Register/FormRegister";


export function Register(){
    return(
        <> 
        <Navbar/>
            <FormRegister />
        </>
    )
}