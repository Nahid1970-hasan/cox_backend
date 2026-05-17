import styled, { keyframes } from "styled-components";

const fadein = keyframes`
from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
`;

const expand = (length) => keyframes`
    from {
      min-width: 54px;
    }
    to {
      min-width: ${length};
    }
  `;
const stay = (length) => keyframes`
 from {
    min-width: ${length};
  }
  to {
    min-width: ${length};
  }
 `;
const shrink = (length) => keyframes`
    from {
      min-width: ${length};
    }
    to {
      min-width: 54px;
    }
  `;

const fadeout = keyframes`
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
  `;

export const StyledToast = styled.div`
  visibility: hidden;
  user-select: none;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  bottom: 30px;
  left: 0px;
  right: 0px;
  height: 50px;
  font-family: var(--title-secondary);
  font-size: 14px;
  width: 54px;
  margin: auto;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 2000;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    & > span {
      vertical-align: middle;
    }
    padding: 10px 15px;
  }
  & > :first-child {
    float: left;
    background: ${({ color, theme }) =>
      !color ? theme.colors.primay : theme.colors[color]};
    color: #fff;
    z-index: 1;
  }
  & > :last-child {
    background: ${({ theme }) => theme.colors.success_bg};
  }

  &.show {
    visibility: visible;
    animation: ${fadein} 0.5s,
      ${({ msg }) => expand((msg.length * 14) / window.devicePixelRatio + "px")}
        0.5s 0.5s,
      ${({ msg }) => stay((msg.length * 14) / window.devicePixelRatio + "px")}
        3s 1s,
      ${({ msg }) => shrink((msg.length * 14) / window.devicePixelRatio + "px")}
        0.5s 4s,
      ${fadeout} 0.5s 4.5s;
  }
`;
