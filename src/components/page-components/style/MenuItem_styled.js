import styled from "styled-components";

export const MenuItem = styled.li`
  padding: 6px 10px !important;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  ${({highlight})=> highlight&& "border-top: 1px solid #ddd;"}
  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
