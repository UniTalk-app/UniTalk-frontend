import {createMuiTheme} from "@material-ui/core";


declare module '@material-ui/core/styles/createPalette' {
    interface TypeBackground {
        dp02: string,
        dp04: string,
        dp16: string,
    }
}

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

export default appTheme;
