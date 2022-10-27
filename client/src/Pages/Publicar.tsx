import {useState} from "react"
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Validate,{formType, errType} from "../components/addProduct/validate";



const Publicar = () => {
  const [err, setErr] = useState<errType> ({
    name: "",
    price_local: "",
    stock: "",
    description: "",
    suspended: "",
  });
  const [input, setInput] = useState<formType>({
    name: "",
    price_local: 0,
    stock: 0,
    description: "",
    suspended: "",
  });

  const handleChange = (e:any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErr(Validate({ ...input, [e.target.name]: e.target.value }));
    
    // console.log(input)
    console.log(err);
  };
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(err.name.length)
    if(err.name === "null" || err.price_local==="null" || err.stock==="null" || err.description==="null" || err.suspended==="null"){
      alert("faltan datos")
    } else{
      alert("vas bien")
    }
  };
  return (
    <PublicarContainer>
      <Navbar/>
      <AddProduct>
        <h1 className='addproduct-title'>Add Product</h1>
        <form action="" className='formularioproduct'>
          <div className="productinfo">
            <div className="productinfo__left">
              <div className="inputinfo">
                <label htmlFor="">Nombre del producto:</label>
                <input name='name' type="text"  onChange={handleChange} />
              </div>
              <div className="inputinfo">
                <label htmlFor="price_unit">Precio:</label>
                <input name='price_local' type="number" onChange={handleChange} />
              </div>
              <div className="inputinfo">
                <label htmlFor="stock">Stock:</label>
                <input name='stock' type="number" onChange={handleChange} />
              </div>
              <div className="inputinfo">
                <label htmlFor="description">Descripcion:</label>
                <textarea name='description' rows={5} cols={33} onChange={handleChange} />
              </div>
              <div className="inputinfo">
                <label htmlFor="suspended">Estado:</label>
                <select name="suspended" id="" onChange={handleChange}>
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="si">Activo</option>
                  <option value="no">Suspendido</option>
                </select>
              </div>

            </div>
            <div className="productinfo__Right">
              <div className="imageupload">
                <input type="file" />
              </div>

            </div>
          </div>
          <button onClick={handleSubmit} className='submitproduct'>Submit</button>
        </form>
        
      </AddProduct>
    </PublicarContainer>
  )
}

const PublicarContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
`;
const AddProduct = styled.div`
  width: 100%;
  padding-top: 131px;

  .addproduct-title{
    text-align: center;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 20px;
  }
  .formularioproduct{
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .productinfo{
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }

  .productinfo__left{
    width: 60%;
  }

  .inputinfo{
    display: flex;
    flex-direction: column;

    label{
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.primary};

    }

    input{
      width: 500px;
      height: 40px;
      padding: 10px;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    textarea{
      width: 500px;
      resize: none;
      background-color: ${({ theme }) => theme.tertiary};
      border: none;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 10px;
    }

    select{
      width: 500px;
      resize: none;
      background-color: ${({ theme }) => theme.tertiary};
      border:none;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }

  .productinfo__Right{
    width: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    
  }

  .imageupload{
    width: 270px;
    height: 270px;
    background-color: ${({ theme }) => theme.tertiary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    input{
      width: 135px;
    }
  }

  .submitproduct{
    width: 150px;
    background-color:${({ theme }) => theme.primary} ;
    border: none;
    padding: 10px;
    font-weight: 0;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }

  .submitproduct:hover{
    background-color: #3479c9;
  }

  @media screen and (max-width: 1100px) {
    .productinfo{
      flex-direction: column-reverse;
      height: auto;
    }

    .productinfo__Right{
      width: 100%;
      margin-bottom: 20px;
    }
    .productinfo__left{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    

    .formularioproduct{
      padding: 0;
    }
  }

  @media screen and (max-width: 550px){
    .productinfo__left{
      padding:  0px 20px;
      input{
        width: 100%;
      }
      textarea{
        width: 100%;
      }
    }

    .inputinfo{
      width: 100%;
    }
  }

  
`;

export default Publicar