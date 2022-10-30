
import styled from "styled-components";
import UserGeneral from "../components/Usuario/UserGeneral";

const Usuario = () => {
  return (
    <UsuarioContainer>
      <UserGeneral />
    </UsuarioContainer>
  );
};

export default Usuario;

const UsuarioContainer = styled.div`
  height: 100vh;
`;
