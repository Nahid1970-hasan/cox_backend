import styled from "styled-components";

export const Select = styled.select`
  display: block;
  width: 100%;
  height: ${({ height }) => (height ? height : "auto")};
  padding: 0.375rem 0.75rem;
  margin-top: ${({ app }) => (app ? ".15rem" : "0.55rem")};
  border: 1px solid gainsboro;
  border-radius: ${({ app }) => (app ? "0.3rem" : 0)};
  font-size: ${({theme }) =>theme.fontSize.font} ;
  font-weight: 400;
  line-height: 1.5;
  color:  ${({theme }) =>theme.colors.inputFont} ;
  background-color: ${({theme }) =>theme.colors.inputBackground} ;
  background-clip: padding-box;
  appearance: menulist-button;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
  height:35px;

  &:disabled {
    cursor: default;
    background-color: #dfdfdf;
    border-radius: 0.3rem; 
  }
`;
