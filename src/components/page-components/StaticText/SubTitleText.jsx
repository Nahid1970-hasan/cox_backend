 
import { Flex } from "../style/Flex_styled";
import { Typography } from "../style/Typography_styled";

export const SubTitleText = ({children, fontSize}) => {
  return (
    <Flex md={12}>
        <Typography fontSize={fontSize ?? "bodySubTitleFontSize"} textAlign="left" fontWeight="bold">
         {children??"---"}
        </Typography>
    </Flex>
  );
};
