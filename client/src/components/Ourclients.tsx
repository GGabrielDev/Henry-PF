import React from "react";
import styled from "styled-components";
import monito from "../assets/monito.jpg";
import monitodos from "../assets/monito2.jpg";
import monitotres from "../assets/monito3.jpg";
import { BiSearchAlt, BiFilterAlt, BiArchiveIn } from "react-icons/bi";
import { Link } from "react-router-dom";

const Ourclients = () => {
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
              <option value="value1">Value 1</option>
              <option value="value2" selected>
                Value 2
              </option>
              <option value="value3">Value 3</option>
            </select>
          </div>
          <input type="text" />
          <div className="iconinput">
            <BiSearchAlt />
          </div>
        </div>
      </div>
      <div className="sectionclientscards">
        <div className="navbarclientsfilter">
          <div className="lastestandpopular">
            <div className="itemnavbarclient">Lastest</div>
            <div className="itemnavbarclient">Popular</div>
          </div>
          <div className="filtericonclients">
            <div className="itemnavbarclient">
              <BiFilterAlt />
            </div>
            <div className="itemnavbarclient">
              <BiArchiveIn />
            </div>
          </div>
        </div>
        <div className="gridcards">
          <div className="cardclient">
            <div className="cardclientimg">
              <img src={monito} alt="" />
            </div>
            <div className="cardinfoclients">
              <div className="titleandsubtitlecardclient">
                <h3>Tu Gamer</h3>
                <h4>Gamer</h4>
              </div>
              <div className="buttoncardclient">
                <Link to="tugamer">
                  <button>Visitar</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="cardclient">
            <div className="cardclientimg">
              <img src={monitodos} alt="" />
            </div>
            <div className="cardinfoclients">
              <div className="titleandsubtitlecardclient">
                <h3>Tu Pan</h3>
                <h4>Panaderia</h4>
              </div>
              <div className="buttoncardclient">
                <button>Visitar</button>
              </div>
            </div>
          </div>
          <div className="cardclient">
            <div className="cardclientimg">
              <img src={monitotres} alt="" />
            </div>
            <div className="cardinfoclients">
              <div className="titleandsubtitlecardclient">
                <h3>Tu Gamer</h3>
                <h4>Gamer</h4>
              </div>
              <div className="buttoncardclient">
                <button>Visitar</button>
              </div>
            </div>
          </div>
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
    background-color: #f1f1f1;

    .categoryclientinput {
      padding: 5px;
      width: 150px;
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
      padding: 10px;
      border: none;
      background-color: transparent;
    }

    .iconinput {
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

  .navbarclientsfilter {
    padding: 0 30px;
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
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
    box-shadow: 2px 2px 15px #30303021;
    border-radius: 10px;

    h3 {
      font-size: 30px;
      line-height: 25px;
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
      background-color: #005cff;
      color: white;
      border-radius: 7px;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover {
      background-color: #0048c4;
    }
  }
  .cardclientimg {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 10px;
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

    .navbarclientsfilter {
      padding: 0;
    }
  }

  @media screen and (max-width: 775px) {
    .gridcards {
      grid-template-columns: repeat(1, 1fr);
      padding: 0;
    }
  }
  @media screen and (max-width: 400px) {
    .gridcards {
      grid-template-columns: repeat(4, 1fr);
      padding: 0;
      overflow: auto;
    }
  }
`;

export default Ourclients;
