import { Colors } from "styles/theme";
import { Box, Typography, styled } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import { darken, lighten } from "polished";

export const MainContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    maxWidth: "xl",
}))
export const LeftSideBar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("md")]: {
        width: "100%",
        display: "block",
    },
    height: "60vh",
    overflow: "scroll"
}))
export const LeftSideBarTagContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "100%",
    display: "none",
    [theme.breakpoints.up("md")]: {
        width: "100%",
        display: "block"
    },
    height: "30vh",
    overflow: "scroll"
}))
export const RightSideBar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "25%",
    display: "none",
    borderLeft: "1px solid #fff",
    [theme.breakpoints.up("md")]: {
        width: "25%",
        display: "block"
    },
}))
export const HomeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
}))
export const LeftSideAccordionLibrary = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkGray : Colors.gray,
}))
export const LeftSideAccordionCollection = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkCollection : Colors.Collection,
}))
export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? Colors.primary : Colors.darkPrimary
}));
export const ItemContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    padding: "12px",
    margin: "8px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
}));

export const AttachmentContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        width: "100%"
    },
    padding: "8px",
    margin: "4px",
    marginBottom: "8px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    border: `1px solid ${theme.palette.mode === "dark" ? Colors.primary : Colors.darkPrimary}`,
}));
export const MiddleContainer = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    [theme.breakpoints.down("md")]: {
        width: "100%"
    },
    padding: "6px",
    margin: "6px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    width: "50%",

}));



