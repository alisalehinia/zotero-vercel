import { styled, Box } from "@mui/material"
import { Colors } from "../theme";

export const FormContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? Colors.darkPrimary : Colors.primary,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    border: "blue",
    padding: "30px",
    marginTop: "4px",
    width: "500px",
    flexDirection: "column",
}));
