import styled from "styled-components";

export const Img = styled.img`
    margin: ${({margin}) => ( margin ? margin :0 )};
    padding: ${({padding}) => ( padding ? padding : "5px")}; 
    border: ${({noborder, theme}) => ( noborder ? 'none' :'1px solid '+theme.colors.primaryBorder )}; 
    height: ${({height}) => ( height ? height : "auto")};
    width: ${({width}) => ( width ? width : "auto")};
    display: block;
    max-height: 500px;

`;