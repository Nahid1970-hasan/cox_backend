import styled from "styled-components";

export const StyledTextField = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  vertical-align: top;
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;

  & > label {
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 24px);
    position: absolute;
    left: 0;
    top: 0;
  }

  & > div {
    border: 1px solid red;
    & > input {
      width: 100%;
      color: currentColor;
      padding: 5px 10px;
      boder: 0;
      box-sizing: content-box;
    }
    & > fieldset {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: -5px;
        display: block;
        pointer-event:none;
    }
  }
`;
