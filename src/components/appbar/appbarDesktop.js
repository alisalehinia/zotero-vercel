import { SearchRounded } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useUIContext } from "../../context/ui";
import { AppbarContainer, AppbarHeader, DarkModeSwitch, MyList } from "../../../styles/appbar/index";
import Actions from "./actions";
import Link from "next/link";
import Button from '@mui/material/Button';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";




export default function AppbarDesktop({ matches, darkMode, toggleTheme }) {


    const { setShowSearchBox } = useUIContext();

    const { user } = useAuth();

    const router = useRouter();

    // Access the current URL
    const currentUrl = router.asPath;
    console.log(currentUrl);

    return (
        <AppbarContainer>
            <AppbarHeader>
                Zotero
            </AppbarHeader>
            <MyList type="row">
                {currentUrl !== "/" && <Link href="/">
                    <ListItemText primary="Home" sx={{ margin: "1px", cursor: "pointer" }} />
                </Link>}
                {currentUrl !== "/app" && <Link href="/app">
                    <ListItemText primary="App" sx={{ margin: "1px", cursor: "pointer" }} />
                </Link>}
                {!user && <> <Link href="/login">
                    <ListItemText sx={{ margin: "1px", cursor: "pointer" }} primary="Login" />
                </Link>
                    <Link href="/signup">
                        <ListItemText sx={{ margin: "1px", cursor: "pointer" }} primary="Signup" />
                    </Link> </>}
                <Link href="/groups">
                    <ListItemText sx={{ margin: "1px", cursor: "pointer" }} primary="Groups" />
                </Link>
            </MyList>
            <DarkModeSwitch checked={darkMode} sx={{ m: 1 }} onChange={toggleTheme} value={darkMode} />
            <Actions matches={matches} />
        </AppbarContainer >
    )
}

