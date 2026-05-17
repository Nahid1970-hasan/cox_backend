import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  :root{
    --body-font: Cambria; // poppinsRegular;
    --navbar-font:  Cambria; //poppinsRegular // PoppinsSemiBold;
    --footer-title: Cambria;  //poppinsRegular;
    --footer-text: Cambria ; //poppinsRegular;
    --title-primary: Cambria ; //poppinsRegular;
    --title-secondary: Cambria; // poppinsRegular;

    --dashboard-font: Cambria; //poppinsRegular;
    --dashboard-title: Cambria; //poppinsRegular ;// UniNeueBold;
    --bg: #fff;
    --font: #000;
    --primary: #30b256; //#006332
    --secondary: #217b3c; // #26b355
    --button-primary: #1e9c82;
    --button-secondary: #065a48;
    --button-font: #fff;
    --font-size: 18px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    background: "../assets/img/bmdaislogo.jpg";
    color: #161D25;
    font-family: var(--body-font), sans-serif;
    font-size: var(--font-size);
    margin: 0; 
    padding: 0;
    height: 100%;
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height:100%;
  }

  label{
    display: inline-block;
    /* margin-top: 0.75rem; */
  }

  input:not([type="checkbox"]) + label {
    margin-top: 0.75rem;
  }

  input:disabled {
    cursor: default;
    background-color:#dfdfdf;  
    border-radius: 0.3rem;
}
 
.react-datepicker-wrapper input {
    display: block;
    padding: 0.375rem 0.75rem;
    margin-top: 0.15rem;
    margin-left: 0px;
    border: 1px solid gainsboro;
    border-radius: 0.3rem;
    font-size: var(--font-size);
    font-weight: 400;
    line-height: 1.5;
    color: var(--font);
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    cursor: pointer;
    background-color: var(--bg);
    background-clip: padding-box;
    appearance: menulist-button;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    font-family: var(--dashboard-font);
}
 
.react-datepicker__month .react-datepicker__month-text, .react-datepicker__month .react-datepicker__quarter-text {
  display: inline-block;
  width: auto;
  margin: 5px 10px;
  height: auto;
  font-size: var(--font-size);
  font-family: var(--dashboard-font);
  padding: 5px 10px;
}

.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    margin-top: 0px;
    color: var(--button-font);
    font-weight: bold;
    font-size: var(--font-size);
    font-family: var(--dashboard-font);
    background: var(--primary);
}
.__json-pretty__{
  text-wrap: wrap;
  word-break: break-all;
  font-family: var(--dashboard-font);
  font-size: 14px;
}
`;
