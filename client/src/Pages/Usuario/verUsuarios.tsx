import MenuUsuario from "./MenuUsuario";
import styled, { useTheme } from "styled-components";
import Perfil from "../../assets/imagenesSlider/profile.png";
import { ThemesLanding } from "../../components/ThemesLanding";
import { ThemeProvider } from "styled-components";
import {
  actions,
  restoreSeller,
  selectors,
  UserType,
} from "../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const { selectUsers } = selectors;
const { getUsers, crearVendedor, deleteSeller } = actions;

const General = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const Alerta = () => {
    Swal.fire({
      title: "Role cambiado",
      text: "Has cambiado el role del usuario",
      icon: "success",
      confirmButtonText: "Ok!",
    });
  };

  const AlertaRestore = () => {
    Swal.fire({
      title: "Role cambiado",
      text: "En breve se actualizara la página",
      icon: "success",
      confirmButtonText: "Ok!",
    });
  };

  const handleDispatchUser = (user: UserType) => {
    dispatch(crearVendedor(user.id));
    Alerta();
  };

  const handleDispatchDelete = (user: UserType) => {
    AlertaRestore();
    setTimeout(() => {
      window.location.reload();
      dispatch(deleteSeller(user.sellerId as string));
    }, 1000);
  };

  const handleDispatchRestore = (user: UserType) => {
    AlertaRestore();
    setTimeout(() => {
      window.location.reload();
      dispatch(restoreSeller(user.sellerId as string));
    }, 1000);
  };

  const renderUsers = (user: UserType) => (
    <div className="users__container" key={user.id}>
      <div className="user__data">{user.firstName}</div>
      <div className="user__data">{user.lastName}</div>
      <div className="user__data__email">{user.email}</div>
      <div className="user__data">
        {!user.sellerId ? (
          <button
            className="status__button"
            onClick={() => handleDispatchUser(user)}
          >
            user
          </button>
        ) : (
          <>
            {user.seller ? (
              <button
                className="status__button"
                onClick={() => handleDispatchDelete(user)}
              >
                suspender
              </button>
            ) : (
              <button
                className="status__button"
                onClick={() => handleDispatchRestore(user)}
              >
                restaurar
              </button>
            )}
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
    transition: 0.4s;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
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
