import * as React from 'react';

import { createMuiTheme, ThemeProvider as MUIThemeProvider } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

/**
 * 1) This is a place where the app theme is defined
 * 2) The object can be exported to another file once it gets bigger 
 */

declare module '@material-ui/core/styles/createPalette' {
    interface TypeBackground {
        dp02: string,
        dp04: string,
        dp16: string,
    }
};

const appTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#96A4FE'
        },
        background: {
            default: '#121212',
            dp02: '#222222',
            dp04: '#282828',
            dp16: '#343434',
        }
    },
    shape: {
        borderRadius: 10
    },
});

const StyleProvider: React.FC = ({children}) => (
    <MUIThemeProvider theme={appTheme}>
        <ThemeProvider theme={appTheme}>
            {children}
        </ThemeProvider>
    </MUIThemeProvider>
)

export default StyleProvider;
