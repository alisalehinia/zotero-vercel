import { useAttachmentContext } from '@/context/AttachmentContext'
import { Box, InputLabel, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AttachmentContainer } from 'styles/body'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import http from 'services/httpService';
import { saveAs } from 'file-saver';
import axios from 'axios';


const MiddleContainerComponent = () => {
    const { attachments } = useAttachmentContext();
    console.log(attachments);

    const downloadFile = async (id, name) => {
        try {
            const res = await http.get(`/attachments/${id}/file`, { responseType: 'blob' });
            // Check if the response is successful and has the file data
            if (res && res.data) {
                // Save the file using FileSaver.js
                saveAs(res.data, name);

                // Optionally, display the file in the browser (if supported)
                const fileUrl = URL.createObjectURL(res.data);
                window.open(fileUrl, '_blank'); // Opens the file in a new tab or window
            } else {
                console.log('File not found or response error.');
            }
        } catch (error) {
            console.log('Error downloading the file:', error);
        }
    };

    return (
        <Box sx={{ padding: "5px", }}>
            <Box sx={{ marginBottom: "10px" }}>
                <AddNewAttachmentType />
            </Box>
            <Typography variant="h4" sx={{ marginBottom: "10px", borderBottom: "1px solid " }}>Attachments</Typography>
            {
                attachments.length > 0 ? attachments.map((attachment, index) => {
                    // const isOdd = (index + 1) % 2 === 1;
                    // const backgroundColor = isOdd ? '#94a3b8' : '#64748b';
                    // sx={{ backgroundColor: backgroundColor }}
                    return <AttachmentContainer key={attachment._id}  >
                        <Box>{attachment.name}</Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FileDownloadIcon onClick={() => downloadFile(attachment._id, attachment.name)} />
                            <AttachmentMenu attachmentId={attachment._id} />
                        </Box>
                    </AttachmentContainer>
                })
                    : <Box sx={{ textAlign: "center" }}>No Item Selected</Box>
            }
        </Box>
    )
}

export default MiddleContainerComponent
// !-------------- menu

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export function AttachmentMenu({ attachmentId }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem>
                    <UpdateAttachmentDialog attachmentId={attachmentId} />
                </MenuItem>
                <MenuItem>
                    <DeleteAttachmentDialog attachmentId={attachmentId} />
                </MenuItem>
            </Menu>
        </div>
    );
}

// ! --------------- delete attachment dialog

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from 'styles/input';
import { toast } from 'react-hot-toast';
import AddNewAttachmentType from '../formDialog/addNewAttachmentType';

export function DeleteAttachmentDialog({ attachmentId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteHandler = () => {
        http.delete(`/attachments/${attachmentId}`).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err))
    }
    return (
        <div>
            <div onClick={handleClickOpen}>
                delete
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {" are you sure to delete attachment?"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        deleteHandler()
                        handleClose()
                    }} autoFocus>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//  ! ------------ update attachment dialog
export function UpdateAttachmentDialog({ attachmentId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    //! All attachment's types
    const [allAttachmentTypes, setAllAttachmentTypes] = useState([]);
    const fetchAttachmentTypes = () => {
        http.get("/attachmentTypes").then((res) => {
            setAllAttachmentTypes(res.data.data)
        }).catch((err) => console.log(err))
    }
    React.useEffect(() => {
        fetchAttachmentTypes();
    }, []);

    const handleUpdate = () => {
        if (!name || !type) return;
        http.patch(`/attachments/${attachmentId}`, {
            name: name,
            type: type
        }).then((res) => {
            console.log(res);
            toast.success("update success")
        }).catch((err) => console.log(err))
    }
    return (
        <div>
            <div onClick={handleClickOpen}>
                update
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"update attachment? "}
                </DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        handleUpdate()
                        handleClose()
                    }} autoFocus>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}