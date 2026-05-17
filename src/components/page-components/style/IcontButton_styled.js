import styled from "styled-components";

export const StyledIconButton = styled.div`
  display:  ${({display})=> display ??'inline-flex'} ;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;
  text-align: ${({alignment})=> alignment ??'center'};
  text-decoration: none;
  position: relative;
  box-sizing: border-box;
  background-color: ${({bgColor, theme})=> !!bgColor? theme.colors[bgColor].concat('aa'):"transparent"};
  padding: ${({padding})=> padding ??'8px'} ;
  width:  ${({width})=> width ??'auto'} ;
  border-radius: 50%;
  background-position: center;
  transition: background 1s;
  ${({color, theme})=> `color:${theme.colors[color]};`}

  ${({nothover})=> nothover ?? `&:hover {
    background: #dfdfdf radial-gradient(circle, transparent 1%, #dfdfdf 1%) center/15000%;
  }`}
  

  &:active {
    background-color: #c7c4c4;
    background-size: 100%;
    transition: background 0s;
  }
`;
