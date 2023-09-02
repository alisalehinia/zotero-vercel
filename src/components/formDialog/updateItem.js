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
import { Input } from 'styles/input';
import { Box, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateItemAsync } from 'store/item/item-actions';


export default function UpdateItemFormDialog({ text, itemId, collectionId, menuClose }) {
    // console.log("update Item form dialog", text, itemId, fetchCollectionItems, collectionId);    
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [primaryAttachment, setPrimaryAttachment] = React.useState(null); //? the attachment which's metadata will be used
    const [itemType, setItemType] = React.useState(undefined);
    const [metadata, setMetadata] = React.useState({});  //?object
    const [tags, setTags] = React.useState([]);       //? array of tag objects
    const [related, setRelated] = React.useState([]);  //? array of items

    const dispatch = useDispatch();

    const changeItemInfo = async (itemId) => {
        const updatedData = {
            name: name,
            name: name,
            primaryAttachment: primaryAttachment,
            itemType: itemType,
            metadata: metadata,
            tags: tags,
            related: related
        }
        dispatch(updateItemAsync(collectionId, itemId, updatedData));

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
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Item name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        changeItemInfo(itemId)
                        menuClose()
                    }}>
                        update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}