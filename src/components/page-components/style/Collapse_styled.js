import styled from "styled-components";

export const Collapse = styled.div`
  min-height: 0px;
  height: ${({ open }) => (open ? "auto" : "0px")};
  transition-duration: 300ms;
  overflow: hidden;
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
