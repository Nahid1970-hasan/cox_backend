 
import styled from "styled-components";
import { Flex } from "../style/Flex_styled";
import { Typography } from "../style/Typography_styled";
import {theme} from "../../styles/theme";

const NList = styled.li`
  text:indent: -20px;
  padding-left: 20px;
  list-style: decimal; 
  font-size:  ${theme.fontSize.bodyContentFontSize};
  color : ${theme.colors.font};
`
export const ContentText = ({children, list, padding, number}) => {
  return (
    <Flex padding={padding ?? "0"} md={12}>
       <div style={{padding:list?'10px 0 0 0':'0'}}>
       <Typography fontSize={'bodyContentFontSize'} textAlign="justify">
          {list?<li style={{paddingLeft:'20px', listStyle:number?'decimal':'disc', textIndent:"-20px"}}>{children}</li>:children??"---"}
        </Typography>
       </div>
    </Flex>
  );
};

export const ContentLi = ({children}) => {
  return (
     <NList><span style={{padding:'10px 0 0 10px'}}>{children}</span></NList>
  );
};
