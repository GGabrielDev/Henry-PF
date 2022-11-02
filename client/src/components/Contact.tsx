import styled from "styled-components";

const ContactSectionStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: red;

  .form__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export default function ContactSection() {
  return (
    <ContactSectionStyle>
      <div className="form__content">
        <span>Nombre</span>
        <input type="text" placeholder="Name" />
        <span>Email</span>
        <input type="text" placeholder="ejemplo@gmail.com" />
        <span>Telefono</span>
        <input type="text" placeholder="11-2332-9395" />
      </div>
    </ContactSectionStyle>
  );
}
