import styled from "styled-components";
export const StyledHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({padding})=> padding? padding : "18px 0"}; 
  margin: 0 auto;
  & > div {
    display: flex;
    & > div {
      position: relative;
      margin: auto 0;
      user-select: none;
      & > a {
        text-decoration: none;
        font-size: 40px;
        color: ${({ theme }) => theme.colors.primary};
        padding-right: 20px;
        & > img {
          height: 90px;
          width: auto;
          display: inline-block;
          vertical-align: text-top;
        }
      }

      & input {
        display: ${({search})=> search? "block": "none"};
        width: 500px;
        height: 40px;
        background-color: #f7f8f9;
        border-radius: 40px;
        border: transparent;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 40px;
      }

      & > .material-icons {
        display: ${({search})=> search? "block": "none"};
        position: absolute;
        top: 8px;
        right: 12px;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
    & > ul {
      position: relative;
      display: flex;
      & li {
        position: relative;
        list-style: none;
        text-align: left;
        margin: auto 0;
        a {
          text-decoration: none;
          padding: 8px;
        }
      }
      & svg {
        stroke: none;
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
