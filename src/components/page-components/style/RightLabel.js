import styled from "styled-components";
import {theme} from "../../styles/theme";

export const  RightLabel = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: ${({justifyContent}) => ( justifyContent ? justifyContent : "right")}; 
  margin: ${({margin}) => ( margin ? margin : "4px 0 10px 0")};
  font-size : ${({theme}) =>theme.fontSize.bodyContentFontSize};
  color: ${({color, theme})=> color? theme.colors[color]:theme.colors.font};
  & input {
    margin-top: 0;
  }

  
`;

