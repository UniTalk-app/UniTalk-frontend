import * as React from 'react';

import { ThemeProvider as MUIThemeProvider } from '@material-ui/core';
import appTheme from "./theme";

/**
 * 1) This is a place where the app theme is defined
 * 2) The object can be exported to another file once it gets bigger 
 */



const StyleProvider: React.FC = ({children}) => (
    <MUIThemeProvider theme={appTheme}>
        {children}
    </MUIThemeProvider>
)

export default StyleProvider;
