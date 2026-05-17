import styled from "styled-components";

export const StyledMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: ${({ top }) => (top ? top : "100%")};;
  right: ${({ last }) => (last ? last : "auto")};
  bottom: ${({ bottom }) => (bottom ? bottom : "auto")};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.font};
  border-radius: 4px;
  margin-top: 3px;
  padding: 8px 0;
  min-width: 110px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 101;
  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    text-transform: capitalize !important;

    & a {
      color: ${({ theme }) => theme.colors.font} !important;
      &::before {
        height: 0% !important;
      }
    }
  }
`;
