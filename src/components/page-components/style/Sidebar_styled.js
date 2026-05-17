import styled from "styled-components";

export const StyledSidebar = styled.nav`
  height: 100vh;
  left: 0;
  top: 0;
  padding-bottom: 50px;
  position: fixed;
  margin-left: 0;
  @media(max-width: ${({theme})=> theme.layout.sm}){
    margin-left: -271px;
  }
  width: 270px;
  z-index: 1020;
  overflow: hidden !important;
  overflow-y: auto;
  transition: 0.5s;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 12px 30px rgba(80, 143, 244, 0.1);

  & > div {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden scroll;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > div.logo {
      justify-content: center;
      align-content: center;
      align-items: center;
      display: flex;
      padding: 20px;
      background: ${({ theme }) => theme.colors.bg};
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin-left: 33%;
      margin-top: 20px;

      & img {
        width: 40px;
        display: inline-block;
      }
    }

    & > ul > li.collapsible {
      &:hover::after {
        color: ${({ theme }) => theme.colors.bg};
      }
      &:not(.collapsed)::after {
        transform: rotate(-135deg);
        top: 1.2rem;
      }
      &::after {
        content: " ";
        border: solid;
        border-width: 0 0.075rem 0.075rem 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        transition: all 0.2s ease-out;
        color: ${({ theme }) => theme.colors.primaryButtonFont};
      }
    }

    & ul { 
      margin-top: 10px;
      list-style: none;
      & > li {
        position: relative;
        & a:hover {
          background: rgba(0, 0, 0, 0.2);
          color: ${({ theme }) => theme.colors.bg} !important;
        }
      }
      & ul {
        margin-top: 10px;
      }
      & ul > li {
        position: relative;
        margin-left: 1.5rem;
      }
    }

    & ul > li a {
      display: block;
      padding: 0.5rem 1.625rem;
      margin:0;
      font-weight: 400;
      transition: background 0.1s ease-in-out;
      position: relative;
      text-decoration: none;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primaryFont};
      background: ${({ theme }) => theme.colors.primary};
      border-left: 3px solid transparent;
      font-family: var(--dashboard-title);
      font-size: inherit;

      &.active {
        background: ${({ theme }) => theme.colors.primaryActive};
      }

      & .material-icons {
        vertical-align: middle;
        margin-right: 10px;
      }
    }

    &:last-child {
      position: absolute;
      overflow: hidden;
      pointer-events: none;
      top: 0;
      bottom: 0;
      right: 0;
      width: 11px;

      & > div.show:before {
        opacity: 0.5;
        transition: opacity 0s linear;
      }

      & > div::before {
        position: absolute;
        top: 4px;
        bottom: 4px;
        content: "";
        background: #fff;
        border-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        left: 3px;
        right: 3px;
        opacity: 0;
        transition: opacity 0.2s linear;
        // height: 30%;
      }
    }
  }
  & + div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(52, 58, 64, 0.35);
    z-index: 1001;
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.sm}) {
    & + .obscure {
      display: block;
    }
  }
`;
