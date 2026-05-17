import styled from "styled-components";
 

export const FAQSection = styled.div`
    margin: 0;
`;
export const FaqForm = styled.form` 
    display: flex; 
    padding: 0.15rem;
    width: 300px;   
    svg {
        height: 1rem;
        fill: ${({theme }) =>theme.colors.answer}; 
        width: 4rem;
        align-self: center;
    }
    input {
        border-radius: 10px;
    }
`;

export const SearchBar = styled.input` 
    font-size: 14px; 
    border: none;  
    padding: 0.5rem;
    width: 300px; 
    &:focus{
        outline: none;
    }
    
`;
export const QuestionWrapper = styled.div`
    width: 100%; 
    padding: 0.25rem 0.5rem;
    transition: 1s;
    background: ${({theme }) =>theme.colors.cardTitle};
    margin: 0.5rem 0;
    border-radius: 10px;
    color: ${({theme }) =>theme.colors.cardTitleFont};
`;

export const Question = styled.div`
    display: flex;
    font-size: 14px; 
    color: ${({theme }) =>theme.colors.cardTitleFont};
    display: flex;
    justify-content: space-between;

    svg {
        width: 1rem;
        height: 1.5rem;
        fill: ${({theme }) =>theme.colors.cardTitleFont};
      }
      
      svg.active {
        transform: rotate(180deg);
      }
      
      svg:hover {
        opacity: 0.8;
      }
`;

export const ArrowButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none;
    }

`;

export const Answer = styled.div`
    display: ${({  active }) => active};
    text-align: left; 
    font-size: 14px;
    line-height: 1.5; 
    height: 0%; 
    background: ${({theme }) =>theme.colors.cardContent};
    margin: 0.25rem 0;
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    color:  ${({theme }) =>theme.colors.cardContentFont};
`;
