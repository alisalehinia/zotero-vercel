import { FavoriteRounded, Logout, PersonAdd, PersonRounded, Settings, ShoppingCartRounded } from "@mui/icons-material"
import { Avatar, Button, Divider, IconButton, ListItemButton, ListItemIcon, Menu, MenuItem, Select } from "@mui/material"
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../../styles/appbar"
import { Colors } from "../../../styles/theme/index";
import { useState } from "react";
import { useAuth, useAuthActions } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Actions({ matches }) {
    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

    const { user } = useAuth();
    const dispatch = useAuthActions();


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //? language setting
    const { locale, locales, push } = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState(locale);
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setSelectedLanguage(selectedLanguage);
        push("/", "/", { locale: selectedLanguage });
    };


    return (
        <Component>
            <MyList type="row">
                {user && <>
                    <Divider orientation="vertical" flexItem />
                    <ListItemButton sx={{ justifyContent: "center" }}>
                        <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </ListItemIcon>
                    </ListItemButton>
                    <Divider orientation="vertical" flexItem /></>}
                <Divider orientation="vertical" flexItem />
                <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                        <ListItemButton sx={{ justifyContent: "center" }}>
                            <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                                <Select
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    variant="outlined"
                                    size="small"
                                >
                                    {locales.map((l) => (
                                        <MenuItem key={l} value={l}>{l}</MenuItem>
                                    ))}
                                </Select>
                            </ListItemIcon>
                        </ListItemButton>

                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar />
                    <Link href="/profile">
                        My account
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Button sx={{ color: Colors.danger, fontSize: "16px" }} onClick={() => {
                        dispatch({ type: "SIGNOUT" })
                    }}>Logout</Button>
                </MenuItem>
            </Menu>
        </Component>
    )
}