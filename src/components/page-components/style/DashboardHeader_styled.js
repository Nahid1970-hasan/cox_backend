import styled from "styled-components";
import { Badge } from "../Badge";
import { StyledBadge } from "./Badge_styled";

export const StyledDashboardHeader = styled.nav`
  font-family: var(--dashboard-font);
  padding: 0 8px;
  display: flex;
  align-items: center;
  z-index: 1000;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    & > button {
      margin: 0 10px;
      @media (max-width: ${({ theme }) => theme.layout.xs}) {
        display: none;
      }
    }

    & > a:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
    & > span {
      margin: 0 5px 0 10px;
      font-size: 20px;
      @media (max-width: ${({ theme }) => theme.layout.xs}) {
        font-size: 18px;
      }
    }
    & a {
      color: ${({ theme }) => theme.colors.font};
      text-decoration: none;
      margin-top:5px;
    }
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      & > form {
        position: relative;
        width: 250px;
        @media (max-width: ${({ theme }) => theme.layout.sm}) {
          width: auto;
        }

        @media (max-width: ${({ theme }) => theme.layout.xs}) {
          display: none;
        }

        & > span {
          position: absolute;
          top: 9px;
          right: 10px;
          display: block;
          color: #aeb0b3;
        }

        & > input {
          border-radius: 8px;
          border: 1px solid #aeb0b3;
          font-size: 14px !important;
          width: 100%;
          font-family: var(--dashboard-font);
          color: #374046;
          padding-right: 30px;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          background-clip: padding-box;
        }

        & > div {
          width: 100%;
        }
      }
      & > ul {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;

        & > li:first-child > a {
          color: #aeb0b3 !important;
          font-family: var(--dashboard-font);
          margin: 0 20px;
        }

        & > li:last-child > a > div:nth-child(2) {
          @media (max-width: ${({ theme }) => theme.layout.xs}) {
            display: none;
          }
        }

        & > li > a {
          display: flex;
          align-items: center;

          & > ${StyledBadge} > span {
            vertical-align: middle;
            margin: 0 5px;
          }
        }
      }
    }
  }
`;
