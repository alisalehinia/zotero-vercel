import { CloseRounded } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, List, ListItemButton, ListItemText, MenuItem, Select, Typography, styled, useTheme } from "@mui/material";
import { lighten } from "polished";
import { useUIContext } from "../../context/ui";
import { DarkModeSwitch, DrawerCloseButton } from "../../../styles/appbar";
import { Colors } from "../../../styles/theme";
import Link from "next/link";
import { MainDrawer } from "styles/drawer.js";
import { useRouter } from "next/router";
import { useState } from "react";
import UserAvatar from "../userAvatar";
import { useAuth } from "@/context/AuthContext";

export const MiddleDivider = styled((props) => (
    <Divider variant="middle" {...props} />
))``; // => can add css between backticks
export default function AppDrawer({ darkMode, toggleTheme }) {

    const { drawerOpen, setDrawerOpen } = useUIContext();

    const { user } = useAuth();

    //? language setting
    const { locale, locales, push } = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState(locale);
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setSelectedLanguage(selectedLanguage);
        push("/", "/", { locale: selectedLanguage });
    };


    return (
        <>
            {drawerOpen
                && <DrawerCloseButton
                    onClick={() => setDrawerOpen(false)} >
                    <CloseRounded sx={{ fontSize: "2.5rem", color: lighten(0.09, Colors.secondary) }} />
                </DrawerCloseButton>}
            <MainDrawer open={drawerOpen}>
                <List>
                    {user && <>
                        <Box sx={{ display: "flex", justifyContent: "space-start", alignItems: "center" }}>
                            <UserAvatar />
                            <Typography variant="h6" sx={{ ml: 1 }}>{user.name}</Typography>
                        </Box>
                        <MiddleDivider />
                    </>
                    }
                    <ListItemButton>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    {!user && <> <ListItemButton>
                        <ListItemText>
                            <Link href="/login">Login</Link>
                        </ListItemText>
                    </ListItemButton>
                        <MiddleDivider />
                        <ListItemButton>
                            <ListItemText>
                                <Link href="/signup">Signup</Link>
                            </ListItemText>
                        </ListItemButton>
                        <MiddleDivider /> </>}
                    <ListItemButton>
                        <ListItemText>
                            <Link href="/groups">Groups</Link>
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <DarkModeSwitch checked={darkMode} sx={{ m: 1 }} onChange={() => {
                        toggleTheme()
                        setDrawerOpen(false)
                    }} value={darkMode} />
                    <MiddleDivider />
                    <ListItemButton>
                        <Select
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            variant="outlined"
                            size="small"
                            sx={{ width: "100%" }}
                        >
                            {locales.map((l) => (
                                <MenuItem key={l} value={l}>{l}</MenuItem>
                            ))}
                        </Select>
                    </ListItemButton>
                </List>
            </MainDrawer>
        </>

    )
}