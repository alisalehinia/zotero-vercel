import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Checkbox, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import http from 'services/httpService';
import { Input } from 'styles/input';
import { toast } from 'react-hot-toast';
import { useAttachmentContext } from '@/context/AttachmentContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAttachment({ text, itemId }) {
    // ! dialog states:
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //!--------------------
    //! form states
    const [name, setName] = useState();
    const [type, setType] = useState('');
    const [file, setFile] = useState();
    const [primary, setPrimary] = useState(false);
    //!--------------------

    //! All attachment's types
    const [allAttachmentTypes, setAllAttachmentTypes] = useState();

    const fetchAttachmentTypes = () => {
        http.get("/attachmentTypes").then((res) => {
            setAllAttachmentTypes(res.data.data)
        }).catch((err) => console.log(err))
    }
    React.useEffect(() => {
        fetchAttachmentTypes();
    }, []);
    // ! -------------------------

    const { setAttachments } = useAttachmentContext();
    const submitAttachment = () => {
        // Create a FormData object to send the form data
        const formData = new FormData();
        // console.log(primary);

        formData.append('name', name);
        formData.append('type', type);
        formData.append('file', file);
        // formData.append('setAsPrimaryAttachment', primary);

        // Make a POST request to your API endpoint
        http.post(`/items/${itemId}/attachments`, formData)
            .then((res) => {
                toast.success("attachment added");
                http.get(`/items/${itemId}/attachments`).then((res) => {
                    setAttachments(res.data.data)
                }).catch((err) => {
                    console.log(err);
                })
                console.log(res);
            })
            .catch((err) => {
                // Handle the error
                console.log(err);
            });
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"add attachment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                            <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter attachment name</InputLabel >
                            <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        </Box>
                        <InputLabel id="type" sx={{ mb: 1 }}>type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value={type}
                            label="type"
                            onChange={(e) => setType(e.target.value)}
                            sx={{ width: "100%" }}
                        >
                            {
                                allAttachmentTypes && allAttachmentTypes.map((attachmentType) => (
                                    <MenuItem key={attachmentType._id} value={attachmentType._id}>{attachmentType.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <InputLabel id="file" sx={{ mb: 1 }}>file</InputLabel>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile);
                            }}
                        />
                        <InputLabel id="file" sx={{ mb: 1 }}>primary</InputLabel>
                        <Checkbox checked={primary} onChange={() => { setPrimary(!primary) }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                    <Button onClick={() => {
                        submitAttachment()
                        handleClose()
                    }}>create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}