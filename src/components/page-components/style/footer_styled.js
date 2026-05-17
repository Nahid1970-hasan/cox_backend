import styled from "styled-components";

export const FooterStyled = styled.div`  
    bottom: 0px;
    position: fixed; 
    user-select: none;
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)}; 
    width: 1200px;
    max-width: 100%;
    padding: 8px 10px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.primary};

    &>p{
        text-align: start;
        margin-right: 10px;
        color: white;
        font-size: 12px;
        a{
            text-decoration: underline;
            color: white; 
            &:hover{
                padding: 5px 2px;
                background: ${({ theme }) => theme.colors.primaryHover};
            }
        } 
    }
    &>div{
        width: 1200px;
        max-width: 100%;
        padding: 0 20px;
        margin: 0 auto;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 2fr 4fr;

        &>div{
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        

        img{
            height: 90px;
            width: auto;
            margin-bottom: 10px;
        }
        p{
            margin-bottom: 10px;
            margin-right: 1.5rem; 
        }

        div{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;

         ul{
            list-style: none;
                
              li{
                font-weight: 400;
                margin-bottom: 20px;

                a{
                    text-decoration: none;
                    color: white;

                    &:hover{
                        color: ${({ theme }) => theme.colors.primaryHover};
                    }
                } 

            }
            
        }


        &>p{
            text-align: start;
            margin-bottom: 40px;
            color: white;
        }
    }
    }
    }


    

   


`