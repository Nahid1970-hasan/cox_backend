import styled from "styled-components";

export const TextArea = styled.textarea`
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  appearance: menulist-button;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
  margin-top: ${({ app }) => (app ? ".15rem" : "0.55rem")};
  border:  ${({ color,theme }) => (color ? "1px solid "+theme.colors[color] : "1px solid "+theme.colors.inputBorder)}; ;
  border-radius: 0.3rem;
  &:disabled {
    cursor: default;
    background-color: #dfdfdf;
    border-radius: 0.3rem; 
  }
`;
