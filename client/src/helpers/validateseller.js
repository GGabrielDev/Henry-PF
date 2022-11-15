import Swal from "sweetalert2";

function ValidateSeller(input) {
  let error = {};

  // ALERTA PARA CUANDO FALTAN DATOS

  const AlertaIncorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Faltan datos",
      icon: "success",
      confirmButtonText: "Perfecto",
    });
  };
 

  if (!input.nombreNegocio.trim()) {
    error.nombreNegocio = "Se requiere un nombre";  }

  if (!input.imageLogo) {
        error.imageLogo = "Falta seleccionar una imagen";
      }

  if (!input.description.trim()) {
    error.description = "Se requiere una descripcion";
  }

  if(!input.categorias){
    error.categorias = "Elige una categoria"
  }
 
  if(!input.template_page){
    error.template_page = "Por favor seleccione un template"
  }


  
 

  return error;
}

export default ValidateSeller;