import styled from "styled-components";

export const StyledAlert = styled.div`
  margin: ${({ margin }) =>  margin ? margin : "0"};;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  padding: 14px;
  background: ${({ theme, type }) =>
    type == "error" ? theme.colors.error_bg : theme.colors.success_bg};

    &>div{
        display: flex;
        &>div{
            padding-right: 10px;
            margin: auto 0;
            & span.material-icons{
                color: ${({ theme, type }) =>
                  type == "error" ? theme.colors.error : theme.colors.success}
          }
    }

  
`;
