import { Box, Drawer, IconButton, List, styled, Typography } from "@mui/material";
import { Colors } from "../theme";

export const MainDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {

        backgroundColor: theme.palette.mode === "dark" ? Colors.darkPrimary : Colors.primary
    }
}))