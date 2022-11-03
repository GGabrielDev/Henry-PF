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

const Ourclients = () => {
  const [item, setItem] = useState({ name: "todas" });
  const [projects, setProjects] = useState<any>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (item.name === "todas") {
      setProjects(projectsData);
    } else {
      const itemFiltered = projectsData.filter((project: any) => {
        return project.Category.toLowerCase() === item.name;
      });
      setProjects(itemFiltered);
    }
  }, [item]);

  const handleClick = (e: any, index: any) => {
    setItem({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  return (
    <Ourclientss>
      <div className="sectioninputclients">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          aliquam reiciendis animi qui praesentium deserunt repudiandae atque,
          ut error amet quibusdam, accusamus id repellat dignissimos, corporis
          quasi aperiam libero hic.
        </p>
        <div className="inputsearchclients">
          <div className="categoryclientinput">
            <select name="categoryclient" id="">
              <option value="value1">Todos</option>
              <option value="value2" selected>
                Entretenimiento
              </option>
              <option value="value3">Indumentaría</option>
              <option value="value3">Gastronomía</option>
              <option value="value3">Estilo y cuidado</option>
            </select>
          </div>
          <input type="text" />
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
          {projects.map((item: any) => {
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
                    <Link to="/tugamer">
                      <button>Visitar</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
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
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
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
