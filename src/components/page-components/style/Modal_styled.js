import styled from "styled-components";
import { IconButton } from "../IconButton";
import { Card } from "./Card_styled";
import { Flex } from "./Flex_styled";
import { StyledIconButton } from "./IcontButton_styled";

export const StyledModal = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  z-index: 1030;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  transition: opacity 0.15s linear;

  & > ${Flex} {
    align-items: center;
    justify-content: center;
    // height: 100%;
    margin-top: 48px;
    & > ${Flex} {
       position: relative;
       top: 50%;
       //left: 50%;
      //transform: translate(-50%, -10px);
      transition: transform 0.3s ease-out;
      box-sizing: border-box;

      & ${Card} > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #aaa; 
        background: ${({  titleBackground, theme }) => ( titleBackground ? theme.colors[titleBackground] :theme.colors.modalHeader)};
        padding:5px 10px;
        margin: 0;
        font-size :  ${({  fontSize, theme }) => ( fontSize ? theme.fontSize[fontSize] :theme.fontSize.modalHeaderFontSize)};
        color: ${({  color, theme }) => ( color ? theme.colors[color] :theme.colors.modalHeaderFont)};

        & > ${StyledIconButton} {
          margin-top: 0;
        }
      }
    }
  }
`;
