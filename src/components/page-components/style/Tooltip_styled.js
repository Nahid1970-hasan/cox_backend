import styled, { css } from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const TooltipTarget = styled.button`
  border: none;
  background: ${({background, theme }) =>background? theme.colors[background] : theme.colors.girdHeader};
  font-family: var(--dashboard-font); 
  color: ${({color,  theme }) => color? theme.colors[color] : theme.colors.girdHeaderFont};  
  font-size: ${({ headerTitle, theme }) =>headerTitle? theme.fontSize[headerTitle]: theme.fontSize.font};
  cursor: inherit;
  display: flex;
`;

export const TooltipBox = styled.span`
  position: absolute;
  display: flex;
  width: max-content;
  white-space: no-wrape;
  z-index: 1300;
  background-color: ${({theme})=> theme.colors.tooltip};
  color: ${({theme})=> theme.colors.tooltipFont};
  font-size: ${({ theme }) => theme.fontSize.font};
  text-align: center;
  border-radius: 5px;
  padding: 0px 5px; 
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);
//   left: -50%;
  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          bottom: unset !important;
          top: calc(100% + 5px);
        `;
      case "left":
        return css`
          margin-right: 0;
          width: 100%;
          left: unset;
          top: 50%;
          right: calc(100% + 5px);
          width: max-content;
        `;
      case "right":
        return css`
          margin-left: 0;
          width: 100%;
          top: 50%;
          left: calc(100% + 5px);
          width: max-content;
        `;
      default:
        return css`
          bottom: calc(100% + 5px);
        `;
    }
  }}
`;
