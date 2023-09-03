import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ListItemButton, styled, useTheme } from '@mui/material';
import AddLibraryDialog from './addLibrary';
import LibraryTree from '../treeView/libraryTree';
import Notes from '../rightsidebar/Notes';
import { useUIContext } from '@/context/ui';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileNote() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const FileStructureOpenButton = styled(Button)(({ theme }) => ({
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }))
    const { selectedItem, selectedCollection } = useUIContext();
    return (
        <div>
            <FileStructureOpenButton variant="outlined" onClick={handleClickOpen} sx={{ m: 1 }}>
                Note table
            </FileStructureOpenButton>
            {/* <ListItemButton onClick={handleClickOpen}>
                <ListItemText>
                    file structure
                </ListItemText>
            </ListItemButton> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', mb: 2 }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ ml: 2 }} variant="h6" >
                            Notes
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Notes collectionId={selectedCollection} itemId={selectedItem} />
            </Dialog>
        </div >
    );
}