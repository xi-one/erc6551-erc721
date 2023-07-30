import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        // mode: 'dark',
        // mode: 'light',
        primary: {
            main: "#F0FF42"
        },
        secondary: {
            main: "#474d57"
        },
        background: {
            paper: "#0b0e11",
            default: "#181a20"
        },

    },
});

export default darkTheme;

export const primaryColor = "#fcd535"
export const secondaryColor = "#474d57"

export const colorObj = {
    primary: "#fcd535",
    secondary: "#474d57",
    background: {
        paper: "#0b0e11",
        default: "#181a20"
    },
    text: {
        primary: "#fcd535",
        secondary: "#474d57",
        disabled: "#474d57",
        hint: "#474d57",
    },
    action: {
        active: "#fcd535",
        hover: "#fcd535",
        hoverOpacity: 0.08,
        selected: "#fcd535",
        selectedOpacity: 0.16,
        disabled: "#474d57",
        disabledBackground: "#474d57",
        disabledOpacity: 0.38,
        focus: "#fcd535",
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
    },
    divider: "#474d57",
}

// 메인
//#fcd535

//배경
//#181a20

// 페이퍼
//#0b0e11
