import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import http from 'services/httpService';
import { toast } from 'react-hot-toast';
import { Box, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import { useDispatch } from 'react-redux';
import { collectionActions } from 'store/collection/collection-slice';
import { updateCollectionAsync } from 'store/collection/collection-actions';


export default function UpdateCollectionFormDialog({ text, libraryId, collectionId, menuClose }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);

    const dispatch = useDispatch();

    const changeCollectionInfo = async (collectionId) => {

        const updatedData = {
            name: name
        }

        dispatch(updateCollectionAsync(libraryId, collectionId, updatedData));
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{text}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Library name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        changeCollectionInfo(collectionId)
                        handleClose()
                        menuClose()
                    }}>
                        update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}