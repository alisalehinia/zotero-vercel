

import { styled, TextField, Button } from "@mui/material"
import { Colors } from "../theme";

export const Input = styled(TextField)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.mode === "dark" ? Colors.darkPrimary : Colors.primary,
    text: theme.palette.mode === "dark" ? Colors.white : Colors.black,
    "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 2px red`,
    },

}));

export const MyButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? Colors.success : Colors.success,
    color: theme.palette.mode === "dark" ? Colors.primary : Colors.darkPrimary,
}));
//w-full py-3 px-4 rounded-xl bg-gray-100 text-secondary-900 border
//border-gray-100 outline-none duration-200 transition-all ease-in-out hover:border-primary-300
// focus:outline-none focus:border-primary-300 focus:shadow-input-focus focus:bg-white;