import { createGlobalStyle } from 'styled-components'

/**
 * Maps theme.js onto :root CSS variables so plain CSS (AdminDashboard, Login, ui/*)
 * stays in sync with the same palette as styled-components (Datagrid, etc.).
 */
export const ThemeBridge = createGlobalStyle`
  :root {
    --theme-primary: ${({ theme }) => theme.colors.primary};
    --theme-banner: ${({ theme }) => theme.colors.banner};
    --theme-gird-header: ${({ theme }) => theme.colors.girdHeader};
    --theme-gird-header-font: ${({ theme }) => theme.colors.girdHeaderFont};
    --theme-body-title: ${({ theme }) => theme.colors.bodyTitle};
    --theme-primary-button: ${({ theme }) => theme.colors.primaryButton};
    --theme-modal-header: ${({ theme }) => theme.colors.modalHeader};
    --theme-grid-body: ${({ theme }) => theme.colors.gridBody};
    --theme-grid-row-odd: ${({ theme }) => theme.colors.gridRowOdd};
    --theme-success: ${({ theme }) => theme.colors.success};
    --theme-font-main: ${({ theme }) => theme.colors.font};
    --theme-bg: ${({ theme }) => theme.colors.bg};
    --theme-sidebar-bg: ${({ theme }) => theme.colors.banner};
    --theme-font-size-base: ${({ theme }) => theme.fontSize.font};
    --theme-font-size-title: ${({ theme }) => theme.fontSize.bodyTitleFontSize};
    --theme-radius-sm: ${({ theme }) => theme.radii.sm};
    --theme-radius-md: ${({ theme }) => theme.radii.md};
    --theme-radius-lg: ${({ theme }) => theme.radii.lg};
    --theme-shadow-card: ${({ theme }) => theme.shadows.card};
    --theme-shadow-login: ${({ theme }) => theme.shadows.loginCard};

    --dashboard-font: var(--font-sans);

    /* Legacy tokens from index.css — driven by theme.js for one source of truth */
    --color-teal: ${({ theme }) => theme.colors.girdHeader};
    --color-teal-light: color-mix(in srgb, ${({ theme }) => theme.colors.girdHeader} 72%, white);
    --color-dark-blue: ${({ theme }) => theme.colors.banner};
    --color-medium-blue: ${({ theme }) => theme.colors.girdHeader};
  }
`
