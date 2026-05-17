import styled from "styled-components";
export const Container = styled.div`
  width: ${({ width }) => (!!width ? width : "1200px")};
  max-width: 100%;
  // padding: 0;  ${({ padding }) => (padding ? padding : "0 20px")}
  margin: 0 auto;  
  border-top: ${({ topBorder }) => (topBorder ? topBorder : "none")} ;
  border-bottom: ${({ bottomBorder }) => (bottomBorder ? bottomBorder : "none")} ;
  border-left: ${({ border, theme }) => (border ? border : "2px solid "+theme.colors.primaryBorder)} ;
  border-right: ${({ border, theme }) => (border ? border : "2px solid "+theme.colors.primaryBorder)} ;
  box-sizing: border-box; 
`;
