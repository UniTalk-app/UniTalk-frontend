import * as React from 'react';

import { createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

/**
 * 1) This is a place where the app theme is defined
 * 2) The object can be exported to another file once it gets bigger 
 */
const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#fafafa'
        },
        secondary: {
            main: '#282828'
        }
    }
});

const StyleProvider: React.FC = ({children}) => (
    <MUIThemeProvider theme={appTheme}>
        <ThemeProvider theme={appTheme}>
            {children}
        </ThemeProvider>
    </MUIThemeProvider>
)

export default StyleProvider;
