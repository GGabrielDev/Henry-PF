import { ErrorStateCategories, InputStateCategories } from "./Cloudinary";
import Swal from "sweetalert2";

function ValidateCategories(input: InputStateCategories): ErrorStateCategories {
	let error: ErrorStateCategories = {
				name: "",
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
 
	if (input.name && !input.name.trim()){
		error.name = "Se requiere una URL de negocio"
	}

  return error;
}

export default ValidateCategories;
