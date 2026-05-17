import styled from "styled-components";
export const Center = styled.div`
  /* justify-content: center; */
  justify-content: space-around;
  display: flex;
  align-items: ${({ row }) => (row ? "flex-start" : "center")};
  // height: 80vh;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`;
