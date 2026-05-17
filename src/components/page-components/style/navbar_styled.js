import styled from "styled-components";

export const StyledNavbar = styled.nav`
  position: ${({position})=> position ?? "sticky"};
  top: -1px;
  left: 0px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  width:${({width})=> width?? "100%"};
  background: ${({ theme }) => theme.colors.primary};
  align-items: center;
  display: flex;
  font-family: var(--navbar-font);
  z-index:100;

  & > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &:last-child>ul>li:last-child{
        padding: 10px;
      }
      ul {
        display: flex;
        list-style: none;
        text-transform: capitalize !important;

        li {
          padding: 10px;
          a {
            text-decoration: none;
            color: ${({ theme }) => theme.colors.barFont};
            font-size : ${({ theme }) => theme.fontSize.font};

            &.active {
              span{
                color: ${({ theme }) => theme.colors.primaryFont};
              }
            }
             
             
          }
        }
        & li:hover {
          background: ${({ theme }) => theme.colors.primaryHover};  
        }
        & li:has(.active){
          background: ${({ theme }) => theme.colors.primaryActive};  
        }

        & li.highlight{
            background-color: ${({ theme }) => theme.colors.primaryActive};
            &>a{
              color: ${({ theme }) => theme.colors.bg};
            }
        }
      }

      
    }
    
    }
  
`;
