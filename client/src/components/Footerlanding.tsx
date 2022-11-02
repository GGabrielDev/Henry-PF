import React from 'react'
import Footer from "../assets/footer.svg"
import styled from "styled-components";

const Footerlanding = () => {
  return (
    <Footerlandingg>Footerlanding</Footerlandingg>
  )
}

const Footerlandingg = styled.div`
    height:300px;
    background-image: url(${Footer});
    background-size: cover;
    background-repeat: no-repeat;
`

export default Footerlanding