import styled from "styled-components";
import {theme} from "../../styles/theme";

export const  Label = styled.span`
  display: flex; 
  align-items: center;
 // line-height: 1;
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "left")}; 
  margin: ${({margin}) => ( margin ? margin : "4px 0 10px 0")};
  font-size : ${theme.fontSize.bodyContentFontSize};
  color: ${({color}) => ( color ? color : "#e64646")};
  & input {
    margin-top: 0;
  }

  // &::before {
  //   content: '◀';
  //   margin: 0 10px;
  // }
`;

export const HLLabel = styled.div`
  background: ${theme.colors.bodySubTitle};
  color: ${theme.colors.bodySubTitleFont};
  font-size : ${theme.fontSize.bodySubTitleFontSize};
  padding: 5px;
  margin: ${({margin})=>margin?margin:"0"}
`;