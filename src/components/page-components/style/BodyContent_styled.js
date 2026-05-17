import styled from "styled-components";

export const BodyContent = styled.section` 
  padding-left: 270px;
  @media(max-width: ${({theme})=> theme.layout.sm}){
    padding-left: 0px;
  }
  width: 100%;
  padding-top: 10px !important;
  padding-right: 10px !important;
  padding-bottom: 10px !important;
  transition: 0.5s;
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.primary};

  & > nav {
    border-bottom: 1px solid #eee;
    height: 70px;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.font};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: sticky;
    top: -13px;
  }

  & > main {
    background: ${({ theme }) => theme.colors.bg};
    min-height: 100vh;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 10px;
    font-size: 12px;
  }
`;
