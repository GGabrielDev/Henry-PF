

function Validate(input) {
  let error = {};

  if (!input.name.trim()) {
    error.name = "Se requiere un nombre";
  }
  if (!input.price_local) {
    error.price_local = "Se requiere una precio";
  } else if (input.price_local < 1) {
    error.price_local = "El precio minimo es de $1";
  } else if (!/^[0-9]+$/i.test(input.price_local)) {
    error.price_local = "No puede contener letras";
  }

  if (!input.stock) {
    error.stock = "Se requiere un stock";
  } else if (input.stock < 0 || input.stock > 9999) {
    error.stock = "Se requiere un numero entre 0 y 9999";
  } else if (!/^[0-9]+$/i.test(input.stock)) {
    error.stock = "No puede contener letras";
  }
  if (!input.description.trim()) {
    error.description = "Se requiere una descripcion";
  }

  if (!input.suspended) {
    error.suspended = "Falta seleccionar el estado";
  }
  if (!input.image) {
    error.image = "Falta seleccionar una imagen";
  }

  return error;
}

export default Validate;
