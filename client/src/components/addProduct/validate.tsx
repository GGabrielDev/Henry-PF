export type formType = {
    name:string,
    price_local: number,
    stock: number,
    description: string,
    suspended: string,
    url:string,
}
export type errType = Record<
    "name" | "price_local" | "stock" | "description" | "suspended" | "url",string
> 


function Validate(input:formType) {


    let error:errType = {
        name:"",
        price_local: "",
        stock: "",
        description: "",
        suspended: "",
        url:"",
    }
    let regExpSoloLetters = /[^a-zA-Z\s]/g;
    
  
    if(!input.name.trim()){
      error.name = 'Se requiere un nombre'
    }else if(regExpSoloLetters.test(input.name)){
      error.name = 'Ingresar solo letras'  
    }
    if(!input.price_local){
      error.price_local = 'Se requiere una precio'
    }else if(input.price_local < 0){
        error.price_local = 'Se requiere un precio desde $0'
    }

    if(!input.stock){
      error.stock = 'Se requiere un stock'
    } else if(input.stock<0 || input.stock > 1000){
        error.stock = 'Se requiere un numero entre 0 y 1000'
    }
    if(!input.description.trim()){
        error.description = 'Se requiere una descripcion'
      }else if(regExpSoloLetters.test(input.description)){
        error.description = 'Ingresar solo letras'  
      }
  
    if(!input.suspended){
      error.suspended = 'Falta seleccionar el estado'
    }
    if(!input.url){
      error.url = 'Falta seleccionar una imagen'
    }

    return error
  }
  
  export default Validate;