import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global.style";
import { theme } from "./theme";
import { ThemeBridge } from "./ThemeBridge";

/**
 * Full styled-components theme + optional legacy global rules + CSS variable bridge.
 * The main app uses ThemeProvider + ThemeBridge in App.jsx; use this if you need GlobalStyles too.
 */
export const StyledThemeProvider = ({ children, withGlobalStyles = false }) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeBridge />
      {withGlobalStyles ? <GlobalStyles /> : null}
      {children}
    </ThemeProvider>
  );
};