import { MenuRounded, SearchRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useUIContext } from "../../context/ui";
import { AppbarContainer, AppbarHeader } from "../../../styles/appbar/index";
import Actions from "./actions";

export default function AppbarMobile({ matches }) {

    const { setDrawerOpen, setShowSearchBox } = useUIContext();

    return (
        <AppbarContainer>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuRounded />
            </IconButton>
            <AppbarHeader textAlign="center" variant="h4">
                LOGO
            </AppbarHeader>
            <IconButton>
                <SearchRounded onClick={() => setShowSearchBox(true)} />
            </IconButton>
            <Actions matches={matches} />
        </AppbarContainer>
    )
}