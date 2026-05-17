import styled from "styled-components";
export const Typography = styled.span`
  display:block;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  width: ${({ width }) => (width ? width : "auto")};
  font-size: ${({ fontSize, theme  }) => (fontSize ? theme.fontSize[fontSize] : theme.fontSize.bodyContentFontSize)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : "var(--dashboard-font)")};
  text-align:${({  textAlign }) => ( textAlign ? textAlign : "center")};
  margin: ${({  margin }) => ( margin ? margin : "0")};
`;
