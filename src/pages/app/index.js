import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material"
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


const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();

    const { selectedItem, selectedCollection } = useUIContext();

    return (
        <HomeContainer>
            {/* //! left sidebar */}

            <Box sx={{ width: "25vw" }}>
                <LeftSideBar>
                    <AddLibraryDialog text="new library" />
                    <LibraryTree groupLibs={null} />
                </LeftSideBar>
                <LeftSideBarTagContainer >
                    <TagBox />
                </LeftSideBarTagContainer>
            </Box>

            {/* //! middle container */}
            <MiddleContainer>
                <FileStructureMobile />
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
