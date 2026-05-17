import styled from "styled-components";

export const StyledBadge = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  & > span:last-child {
    position: absolute;
    top: 0;
    right: 0;
    ${({ theme, badgeContent }) =>
      +badgeContent != 0 && "background:" + theme.colors.primary};
    color: ${({ theme }) => theme.colors.barFont};
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1) translate(50%, -50%);
    height: 20px;
    width: 20px;
    border-radius: 10px;
    font-size: 0.65rem;
  }
`;
