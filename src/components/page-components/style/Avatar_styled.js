import styled from "styled-components";

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
  align-items: center;
  height: 45px;
  width: 45px;
  margin-right: 7px;
  border-radius: 50% !important;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ url, theme }) =>
    theme.colors.primary +
    ` url(${!!url ? url : "/src/assets/img/avatar.jpg"}) no-repeat center`};
  background-size: cover;
`;
