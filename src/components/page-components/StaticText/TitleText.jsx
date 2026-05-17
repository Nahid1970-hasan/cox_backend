import { Center } from "../style/Center_styled";
import { Flex } from "../style/Flex_styled";
import { Typography } from "../style/Typography_styled";

 

export const TitleText = ({title}) => {
  return (
    <Flex md={12}>
              <Center>
                <Typography
                  fontSize="22px"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {title ?? "---"}
                </Typography>
              </Center>
            </Flex>
  );
};
