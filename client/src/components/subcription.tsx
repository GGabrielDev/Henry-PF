import React from "react";
import styled from "styled-components";
import imgtop3 from "../assets/top3.jpg";
import imgtop2 from "../assets/top2.jpg";
import imgtop1 from "../assets/top1.jpg";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const subcription = () => {
  const { isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    <Sectionplans>
      <div className="cardscontainersubs">
        <div className="cardsubcription cardwhite">
          <div className="topsectioncadsub">
            <div className="imgcontainercarsub">
              <img src={imgtop3} alt="" />
            </div>
            <div className="divtitlecardsub">
              <h3>Basic</h3>
              <p>
                $ <span>15</span>/Mes{" "}
              </p>
            </div>
          </div>
          <div className="detailsectioncardsub">
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Crea hasta 4 categorias.</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Agrega hasta 12 productos</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Atencion 24/7 </div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Una cuenta admin </div>
            </div>
          </div>
          <div className="buttoncardsub">
            <Link to="/checkout/basic">
              <button>Adquirir</button>
            </Link>
          </div>
        </div>

        <div className="cardsubcription cardblack">
          <div className="topsectioncadsub">
            <div className="imgcontainercarsub">
              <img src={imgtop2} alt="" />
            </div>
            <div className="divtitlecardsub">
              <h3>Premium</h3>
              <p>
                $ <span>27</span>/Mes{" "}
              </p>
            </div>
          </div>
          <div className="detailsectioncardsub">
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Crea hasta 20 categorias.</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Agrega productos ilimitados</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Atencion 24/7 </div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Hasta siete cuentas admin </div>
            </div>
          </div>
          <div className="buttoncardsub">
            <Link to="/checkout/premium">
              <button>Adquirir</button>
            </Link>
          </div>
        </div>
        <div className="cardsubcription cardwhite">
          <div className="topsectioncadsub">
            <div className="imgcontainercarsub">
              <img src={imgtop1} alt="" />
            </div>
            <div className="divtitlecardsub">
              <h3>Medium</h3>
              <p>
                $ <span>20</span>/Mes{" "}
              </p>
            </div>
          </div>
          <div className="detailsectioncardsub">
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Crea hasta 10 categorias.</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Agrega hasta 50 productos</div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Atencion 24/7 </div>
            </div>
            <div className="lineinfosub">
              <AiOutlineCheck />
              <div className="textlineinfo">Hasta tres cuentas admin </div>
            </div>
          </div>
          <div className="buttoncardsub">
            <Link to="/checkout/medium">
              <button>Adquirir</button>
            </Link>
          </div>
        </div>
      </div>
    </Sectionplans>
  );
};

const Sectionplans = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  padding: 10px;

  .cardscontainersubs {
    width: 1050px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .cardsubcription {
    box-shadow: 2px 2px 15px ${({ theme }) => theme.border};
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .cardwhite {
    width: 320px;
    height: 340px;
  }

  .topsectioncadsub {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .imgcontainercarsub {
    width: 80px;
    height: 80px;
    background-color: aquamarine;
    overflow: hidden;
    border-radius: 7px;

    img {
      width: 140px;
    }
  }

  .divtitlecardsub {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 0 20px;
    p {
      color: #5560ff;
      line-height: 25px;
      span {
        font-size: 35px;
        color: ${({ theme }) => theme.primary};
      }
    }
  }

  .detailsectioncardsub {
    width: 100%;
    padding: 10px;
  }

  .lineinfosub {
    display: flex;
    width: 100%;
    margin-bottom: 10px;

    svg {
      font-size: 25px;
    }
  }

  .textlineinfo {
    padding: 0 17px;
    color: #7e7e7e;
    text-align: start;

    font-size: 15px;
  }

  .buttoncardsub {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    button {
      width: 300px;
      height: 45px;
      border: none;
      color: white;
      font-weight: 700;
      background-color: ${({ theme }) => theme.primary};
      border-radius: 3px;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background-color: #004ab9;
    }
  }

  .cardblack {
    width: 350px;
    height: 390px;
    background-color: ${({ theme }) => theme.primary};

    h3 {
      color: white;
    }
    p {
      color: white;

      span {
        color: white;
      }
    }
    svg {
      color: white;
    }

    span {
      color: white;
    }

    .textlineinfo {
      color: white;
    }

    button {
      background-color: white;

      color: ${({ theme }) => theme.primary};
    }
    button:hover {
      background-color: #eeeeee;
    }
  }

  @media screen and (max-width: 1040px) {
    padding: 0;
    .cardscontainersubs {
      flex-direction: column;
    }

    .cardsubcription {
      width: 100%;
      border-radius: 0px;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 420px) {
    padding: 0;
    .cardsubcription {
      width: 100%;
      margin-bottom: 0px;
      border-radius: 0px;
    }

    .buttoncardsub {
      button {
        width: 100%;
      }
    }
  }
`;

export default subcription;
