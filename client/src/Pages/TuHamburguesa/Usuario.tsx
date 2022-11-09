import styled from "styled-components";
import UserGeneral from "../Usuario/UserGeneral";

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
