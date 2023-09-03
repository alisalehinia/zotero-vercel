import { useEffect, useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material"
import { HomeContainer, LeftSideBar, LeftSideBarTagContainer, MiddleContainer, RightSideBar } from "styles/body";
import { useRouter } from "next/router";
import FileStructureMobile from "@/components/formDialog/fileStractureMobile";
import { useAttachmentContext } from "@/context/AttachmentContext";
import MiddleContainerComponent from "@/components/mainContainer";
import LibraryTree from "@/components/treeView/libraryTree";
import AddLibraryDialog from "@/components/formDialog/addLibrary";
import Notes from "@/components/rightsidebar/Notes";
import { useUIContext } from "@/context/ui";
import TagBox from "@/components/leftsidebar/tagBox";
import MobileNote from "@/components/formDialog/mobileNoteContainer";
import { useAuth, useAuthActions } from "@/context/AuthContext";

const Left = styled(Box)(({ theme }) => ({
    width: "25vw",
    [theme.breakpoints.down("md")]: {
        width: "auto"
    }

}))

const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();

    const { selectedItem, selectedCollection } = useUIContext();

    const dispatch = useAuthActions();
    const { user } = useAuth();

    const router = useRouter();
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    useEffect(() => {
        console.log("44444444444444444444", user);
        setUserDataLoaded(false)
        if (!user) {

            dispatch({ type: "LOAD_USER" })
        }
        if (user) setUserDataLoaded(true)
    }, []);

    useEffect(() => {
        // This effect runs after the initial render
        // Check if the user data has been loaded and reload the page if needed
        if (userDataLoaded) {
            router.reload();
        }
    }, [userDataLoaded]);



    return (
        <HomeContainer>
            {/* //! left sidebar */}

            <Left>
                <LeftSideBar>
                    <AddLibraryDialog text="new library" />
                    <LibraryTree groupLibs={null} />
                </LeftSideBar>
                <LeftSideBarTagContainer >
                    <TagBox />
                </LeftSideBarTagContainer>
            </Left>

            {/* //! middle container */}
            <MiddleContainer>
                <Box sx={{ display: "flex" }}>
                    <FileStructureMobile />
                    <MobileNote />
                </Box>
                <MiddleContainerComponent />
            </MiddleContainer>
            {/* //! right sidebar */}
            <RightSideBar>
                <>
                    <Typography variant="h4" sx={{ borderBottom: "1px solid", marginBottom: "10px", paddingBottom: "17px" }}>Notes</Typography>
                    {(selectedItem || selectedCollection) && <Notes itemId={selectedItem} collectionId={selectedCollection} />}
                </>
            </RightSideBar>
        </HomeContainer>
    );
}

export default Home;
