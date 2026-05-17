import styled from "styled-components";

export const FormStyled = styled.div`
  
  h1{
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    font-family: var(--navbar-font);
  }
  p{
    margin-top: 0.5rem;
    line-height: 1.5;
    font-family: var(--body-font);
  }
  form{
    p{
        text-align: center;
        a{
            text-decoration: none;
        }
    }
    &>label{
        display: inline-block;
        margin-top: 12px;
        font-weight: 400;
        font-family: var(--body-font);
        color: var(--text-color);
    }
    
    section{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        justify-content: space-between;

        div{
            display: flex;
            align-items: center;
            margin: 5px 0px;

            a{
                text-decoration: none;
            }
            /* label{
                color:${({ theme }) => theme.colors.primary} ;
            } */
        }
        
        input{
            width: fit-content;
            margin-right: 10px;
            margin-top: 0;
            margin-bottom: 0;
        }
    }
  }

`