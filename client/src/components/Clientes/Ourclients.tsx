import React from "react";
import styled from "styled-components";
import monito from "../../assets/monito.jpg";
import monitodos from "../../assets/monito2.jpg";
import monitotres from "../../assets/monito3.jpg";
import { BiSearchAlt, BiFilterAlt, BiArchiveIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { projectsData } from "./Data";
import { projectsNav } from "./Data";
import axios from "axios";

const Ourclients = () => {
  const [item, setItem] = useState({ name: "todas" });
  const [projects, setProjects] = useState<any>([]);
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState("DEFAULT");
  const [error, setError] = useState<any>([]);

  const data = async () => {
    const res = await axios.get("http://localhost:3001/sellers");
    console.log(res.data);
    return res.data;
  };

  useEffect(() => {
    data();
    if (item.name === "todas") {
      setProjects(projectsData);
    } else {
      const itemFiltered = projectsData.filter((project: any) => {
        return project.Category.toLowerCase() === item.name;
      });
      setProjects(itemFiltered);
      console.log(itemFiltered);
    }
  }, [item]);

  const handleClick = (e: any, index: any) => {
    setItem({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  const handleChange = (e: any) => {
    const productos = [];
    const errores = [];
    const texto = e.target.value;
    if (category !== "DEFAULT") {
      for (let product of projectsData) {
        let nombre = product.Title.toLowerCase();
        let categoria = product.Category.toLowerCase();
        if (
          nombre.includes(texto.toLowerCase()) &&
          categoria.includes(category)
        ) {
          productos.push(product);
          errores.push(product);
        }
        setProjects(productos);
        setError(errores);
        console.log(nombre.includes(texto.toLowerCase()));
      }
    } else {
      for (let product of projectsData) {
        let nombre = product.Title.toLowerCase();
        if (nombre.includes(texto.toLowerCase())) {
          productos.push(product);
        } else {
          errores.push("No");
        }
        console.log(setError);
        setError(errores);
        setProjects(productos);
      }
    }
  };

  const handleCategory = (e: any) => {
    const productos = [];
    const errores = [];
    setCategory(e.target.value);
    if (e.target.value !== "DEFAULT") {
      for (let product of projectsData) {
        let categoria = product.Category.toLowerCase();
        if (categoria.includes(e.target.value)) {
          productos.push(product);
          errores.push(product);
        }
        setProjects(productos);
        setError(errores);
      }
    } else {
      setProjects(projectsData);
    }
  };

  return (
    <Ourclientss>
      <div className="sectioninputclients">
        <p>
          En este apartado, podemos ver todos los vendedores locales que han
          depositado su confianza en HenryShops. Mira en cada uno de sus sitios
          el trabajo realizado por nuestra startup y de paso checkea lo que
          estan vendiendo nuestros clientes. Te dejamos para que navegues en las
          opciones que decidieron depositar su voto de confianza en HenryShops.
        </p>
        <div className="inputsearchclients">
          <div className="categoryclientinput">
            <select
              name="categoryclient"
              id=""
              onChange={handleCategory}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT">Todos</option>
              <option value="entretenimiento" selected>
                Entretenimiento
              </option>
              <option value="indumentaria">Indumentaría</option>
              <option value="gastronomia">Gastronomía</option>
              <option value="estilo">Estilo y cuidado</option>
            </select>
          </div>
          <input type="text" onChange={handleChange} />
          <div className="iconinput">
            <BiSearchAlt />
          </div>
        </div>
      </div>
      <div className="sectionclientscards">
        <div className="filtros">
          {projectsNav.map((item, index) => {
            return (
              <span
                onClick={(e) => {
                  handleClick(e, index);
                }}
                className={`${
                  active === index ? "active-work" : ""
                }  navbarclientsfilter`}
                key={index}
              >
                {item.name}
              </span>
            );
          })}
        </div>

        <div className="gridcards">
          {error[5] == "No" || (error == false && projects.length === 0) ? (
            <h4 className="NoHayData">No se encontraron resultados</h4>
          ) : (
            projects.map((item: any) => {
              return (
                <div className="cardclient" key={item.id}>
                  <div className="cardclientimg">
                    <div className="img__container">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                  <div className="cardinfoclients">
                    <div className="titleandsubtitlecardclient">
                      <h3>{item.Title}</h3>
                      <h4>{item.Category}</h4>
                    </div>
                    <div className="buttoncardclient">
                      <Link to={`${item.Demo}`}>
                        <button>Visitar</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Ourclientss>
  );
};

const Ourclientss = styled.div`
  width: 100%;
  padding: 0px 40px 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  .sectioninputclients {
    width: 70%;
    padding-bottom: 40px;
    min-width: 320px;

    p {
      margin-bottom: 20px;
    }
  }

  .inputsearchclients {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;

    .categoryclientinput {
      padding: 5px;
      width: 150px;
      border-right: 1px solid ${({ theme }) => theme.border};
    }
    select {
      height: 100%;
      width: 100%;
      border: none;
      background-color: transparent;
    }

    input {
      height: 100%;
      width: 100%;
      border: none;
      padding: 10px;
      background-color: transparent;
      border-radius: 10px;
    }

    .iconinput {
      border-left: 1px solid ${({ theme }) => theme.border};
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }

  .sectionclientscards {
    width: 100%;
  }

  .filtros {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .navbarclientsfilter {
    cursor: pointer;
    margin: 0px 30px 30px 30px;
  }

  .itemnavbarclient {
    cursor: pointer;
  }

  .lastestandpopular {
    width: 140px;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filtericonclients {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      font-size: 30px;
      cursor: pointer;
    }
  }

  .active-work {
    color: ${({ theme }) => theme.secondary};
  }

  .gridcards {
    width: 100%;
    min-height: 400px;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    position: relative;
  }

  .cardclient {
    margin: 0 auto;
    width: 320px;
    height: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 2px 2px 15px ${({ theme }) => theme.border};
    border-radius: 10px;

    h3 {
      font-size: 25px;
      line-height: 25px;
      margin-bottom: 10px;
    }

    h4 {
      font-weight: 500;
    }
  }
  .cardinfoclients {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .buttoncardclient {
    button {
      width: 150px;
      height: 40px;
      border: none;
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
      border-radius: 7px;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover {
      background-color: #${({ theme }) => theme.primary};
    }
  }
  .cardclientimg {
    width: 100%;
    max-height: 200px;
    min-height: 200px;
    margin-bottom: 10px;
  }

  .img__container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }

  .NoHayData {
    position: absolute;
    width: 100%;
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
    grid-template-columns: 1;
  }

  @media screen and (min-width: 1400px) {
    max-width: 1400px;
  }

  @media screen and (max-width: 1100px) {
    padding: 10px;
    .gridcards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 840px) {
    .filtros {
      flex-direction: column;
    }
    .navbarclientsfilter {
      margin: 0 0 10px 0;
    }
    .sectioninputclients {
      padding: 10px;
    }
  }

  @media screen and (max-width: 775px) {
    .gridcards {
      grid-template-columns: repeat(1, 1fr);
      padding: 0;
    }
  }
  @media screen and (max-width: 600px) {
    .gridcards {
      grid-template-columns: repeat(6, 1fr);
      padding: 0;
      overflow: auto;
    }
  }
`;

export default Ourclients;
