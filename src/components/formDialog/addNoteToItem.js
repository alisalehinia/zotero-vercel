import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import http from 'services/httpService';
import { addNoteToItemAsync } from 'store/item/item-actions';
import { Input } from 'styles/input';

const AddNoteToItem = ({ collectionId, itemId, dialogText }) => {

    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addNoteToItemHandler = () => {
        const noteData = {
            text: text
        }
        dispatch(addNoteToItemAsync(collectionId, itemId, noteData));
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
                    {"add new note to item"}
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
                        addNoteToItemHandler()
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

export default AddNoteToItem