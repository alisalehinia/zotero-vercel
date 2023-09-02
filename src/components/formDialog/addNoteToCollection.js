import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import { useDispatch } from 'react-redux';
import { addNoteToCollectionAsync } from 'store/collection/collection-actions';
import http from 'services/httpService';

const AddNoteToCollectionDialog = ({ dialogText, collectionId, libraryId }) => {

    const dispatch = useDispatch();

    const [text, setText] = React.useState("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addNoteToCollectionHandler = () => {
        const noteData = {
            text: text
        }
        dispatch(addNoteToCollectionAsync(libraryId, collectionId, noteData));
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {dialogText}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"add new note to collection"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="text" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter note</InputLabel >
                        <Input id="name" label="text" error={false} variant="outlined" value={text} onChange={(e) => {
                            setText(e.target.value);
                        }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        addNoteToCollectionHandler()
                        handleClose()
                    }
                    } autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddNoteToCollectionDialog