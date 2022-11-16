import Swal from "sweetalert2";
import {InputStateSeller, ErrorStateSeller} from "./Cloudinary";

function ValidateSeller(input: InputStateSeller): ErrorStateSeller {
	let error: ErrorStateSeller = {
				nombreUrl: "",
        nombreNegocio: "",
        imageLogo: "",
        categorias: "",
        template_page: "",
        description: "",
	};

  // ALERTA PARA CUANDO FALTAN DATOS

  const AlertaIncorrecta = () => {
    Swal.fire({
      title: "Error",
      text: "Faltan datos",
      icon: "success",
      confirmButtonText: "Perfecto",
    });
  };
 
	if (input.nombreUrl && !input.nombreUrl.trim()){
		error.nombreUrl = "Se requiere una URL de negocio"
	}

  if (input.nombreNegocio && !input.nombreNegocio.trim()) {
    error.nombreNegocio = "Se requiere un nombre";  }

  if (!input.imageLogo) {
        error.imageLogo = "Falta seleccionar una imagen";
      }

  if (input.description && !input.description.trim()) {
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
