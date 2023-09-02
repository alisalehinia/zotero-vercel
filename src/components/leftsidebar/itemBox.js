import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { ItemContainer } from 'styles/body'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateItemFormDialog from '../formDialog/updateItem';
import { Colors } from 'styles/theme';
import AddAttachment from '../formDialog/addAttachment';
import http from 'services/httpService';
import { useAttachmentContext } from '@/context/AttachmentContext';

const ItemBox = ({ item, collectionId, deleteItem, fetchCollectionItems }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //! menu data for item
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //! /////////////////////////

    // ! fetch all items's attachments 
    const { setAttachments } = useAttachmentContext();

    const fetchItemAttachment = () => {
        http.get(`/items/${item.id}/attachments`).then((res) => {
            // console.log(res.data.data);
            setAttachments(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    //! /////////////////////////

    return (
        <>
            <ItemContainer onClick={() => { fetchItemAttachment() }}>
                <Box>{item.name}</Box>
                {/* //!menu */}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >

                    <MenuItem>
                        <UpdateItemFormDialog text="update item" itemId={item.id} menuClose={handleClose} fetchCollectionItems={fetchCollectionItems} collectionId={collectionId} />
                    </MenuItem>
                    <MenuItem>
                        <AddAttachment text="add attachment" itemId={item.id} />
                    </MenuItem>
                    <MenuItem>
                        add note
                    </MenuItem>
                </Menu>
                <Box sx={{ marginBottom: "4px" }}>
                    {/* //!open menu button */}
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
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => {
                            setDeleteDialogOpen(true);
                        }} />
                    </IconButton>
                </Box>
                {/* <Button >attachments</Button> */}
            </ItemContainer>
            {/* //! delete dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete an Item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Cancel to close window
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                    <Button sx={{ color: Colors.danger }} onClick={() => {
                        deleteItem(item._id);
                        setDeleteDialogOpen(false);
                    }} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ItemBox