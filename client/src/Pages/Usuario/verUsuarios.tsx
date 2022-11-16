import MenuUsuario from "./MenuUsuario";
import styled, { useTheme } from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import { actions, selectors, UserType } from "../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

const { selectUsers } = selectors;
const { getUsers, crearVendedor, deleteSeller } = actions;

const General = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const renderUsers = (user: UserType) => (
    <div className="users__container" key={user.id}>
      <div className="user__data">{user.firstName}</div>
      <div className="user__data">{user.lastName}</div>
      <div className="user__data__email">{user.email}</div>
      <div className="user__data">
        {!user.sellerId ? (
          <button
            className="status__button"
            onClick={() => dispatch(crearVendedor(user.id))}
          >
            user
          </button>
        ) : (
          <>
            <button
              className="status__button"
              onClick={() => dispatch(deleteSeller(user.sellerId as string))}
            >
              seller
            </button>
            {/* <div className="alerta">
              Estas seguro que quieres eso?
              <div className="buttons">
                <button>Ni</button>
                <button>No</button>
              </div>
            </div> */}
          </>
        )}
      </div>
      <div className="user__data">
        {user.sellerId ? (!user.seller ? "Suspendido" : "Activo") : "Usuario"}
      </div>
    </div>
  );
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <GeneralContainer>
      <ThemeProvider theme={ThemesLanding}>
        <MenuUsuario />
        <GeneralContent>
          <h1 className="general__perfil-title">Usuarios de Henry Shops</h1>
          <div className="users__container">
            <div className="user__data">Nombre</div>
            <div className="user__data">Apellido</div>
            <div className="user__data__email">Email</div>
            <div className="user__data">Role</div>
            <div className="user__data">Status</div>
          </div>
          {users.length > 0 ? users.map((user) => renderUsers(user)) : null}
        </GeneralContent>
      </ThemeProvider>
    </GeneralContainer>
  );
};

export default General;

const GeneralContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const GeneralContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  border-left: 1px solid rgb(0, 0, 0, 0.1);

  .general__perfil-title {
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
    text-align: center;
    margin-bottom: 10px;
  }

  .users__container {
    width: 100%;
    display: flex;
  }

  .user__data {
    padding: 10px 5px;
    font-size: 15px;
    width: 100px;
    text-align: start;
    border: 1px solid ${({ theme }) => theme.border};
  }

  .user__data__email {
    padding: 10px 5px;
    font-size: 15px;
    text-align: start;
    border: 1px solid ${({ theme }) => theme.border};
    width: 250px;
  }

  .status__button {
    border: none;
    color: ${({ theme }) => theme.primary};
    background-color: transparent;
    text-decoration: underline;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 10px;
    height: auto;
    .general__input {
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    .general__img {
      flex-direction: column;
      width: 100%;
    }
    .general__perfil-title {
      text-align: center;
    }
    .general__perfil-section {
      text-align: center;
    }
  }
`;
