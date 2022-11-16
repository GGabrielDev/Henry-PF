import type { ReactElement } from "react"

export default function tsx(): ReactElement {
	return {isAuthenticated ? (
    < form onSubmit = { handleSubmit } id = "Myform" className = "formpaycard" >
      <div className="checkoutnombre">
        <p className="nombrecheckout">Nombre Completo: </p>
        <input className="inputnombrecheckout" name="name" type="text" />
        <p className="nombrecheckout">Email: </p>
        <input className="inputnombrecheckout" name="email" type="email" />
        <p className="nombrecheckout">Celular: </p>
        <input
          className="inputnombrecheckout"
          name="celular"
          type="number"
        />
      </div>
      <CardElement className="inputpay" />
  {
    loader ? (
      <button className="pagoboton" disabled>
        <span>Cargando...</span>
      </button>
    ) : (
      <button type="submit" className="pagoboton">
        <span>Comprar</span>
      </button>
    )
  }
    </form >
  ));
}
