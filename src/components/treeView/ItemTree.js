import { useAttachmentContext } from "@/context/AttachmentContext";
import { TreeItem } from "@mui/lab"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "services/httpService";
import { deleteItemAsync, fetchCollectionItems } from "store/item/item-actions";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from "styles/theme";
import UpdateItemFormDialog from "../formDialog/updateItem";
import AddAttachment from "../formDialog/addAttachment";
import AddNoteToItem from "../formDialog/addNoteToItem";
import { useUIContext } from "@/context/ui";


const ItemTree = ({ collectionId }) => {
    const { attachments, setAttachments } = useAttachmentContext();
    const { setSelectedItem } = useUIContext();

    const items = useSelector((state) => state.item.itemsOfCollections);
    const loading = useSelector((state) => state.item.loading);

    const dispatch = useDispatch();

    const handleDeleteItem = (collectionId, itemId) => {
        // Call the deleteItemAsync action creator
        dispatch(deleteItemAsync(collectionId, itemId));
    };
    // ! delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // ! selected item to delete
    const [itemToDelete, setItemToDelete] = useState();
    //! menu states
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setItemToDelete(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setItemToDelete(null);
    };

    useEffect(() => {
        dispatch(fetchCollectionItems(collectionId))
    }, [collectionId, dispatch])

    if (loading) {
        return (
            <CircularProgress />
        )
    }

    const func = (id) => {
        http.get(`/items/${id}/attachments`).then((res) => {
            setAttachments(res.data.data);
        }).catch((err) => console.log(err))
    }

    return (
        items[collectionId].map((item) => {
            return (
                <div key={item._id} className='w-full flex items-start justify-start' onClick={() => setSelectedItem(item._id)}>
                    <div className='flex-grow mt-2'>
                        <TreeItem key={item._id}

                            nodeId={item._id}
                            node={item._id}
                            label={item.name}
                            onClick={() => func(item._id)}
                        />
                    </div>
                    <Box>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuClick(event, item)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id={`long-menu-${item._id}`}
                            MenuListProps={{
                                'aria-labelledby': `long-button-${item._id}`,
                            }}
                            anchorEl={anchorEl}
                            open={open && itemToDelete === item}
                            onClose={handleClose}

                        >
                            {/* //! update item */}
                            <MenuItem>
                                <UpdateItemFormDialog text="update item" itemId={item._id} collectionId={collectionId} menuClose={handleClose} />
                            </MenuItem>
                            {/* //! add new attachment */}
                            <MenuItem>
                                <AddAttachment text="add attachment" itemId={item._id} />
                            </MenuItem>
                            {/* //! add note*/}
                            <MenuItem>
                                <AddNoteToItem collectionId={collectionId} itemId={item._id} dialogText="add note to Item" />
                            </MenuItem>
                            {/* //! delete */}
                            <MenuItem>
                                <Button onClick={() => {
                                    setDeleteDialogOpen(true);
                                }}>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                    <Typography sx={{ color: Colors.danger, fontSize: "12px", width: "100%", height: "100%" }}>delete</Typography>
                                </Button>
                                {/* //! delete dialog  */}
                                <Dialog
                                    open={deleteDialogOpen}
                                    onClose={() => setDeleteDialogOpen(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Are you sure you want to delete an item?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Cancel to close window
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                                        <Button sx={{ color: Colors.danger }} onClick={() => {
                                            handleDeleteItem(collectionId, item._id)
                                            setDeleteDialogOpen(false);
                                            handleClose()
                                        }} autoFocus>
                                            delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </MenuItem>
                        </Menu>
                    </Box>
                </div>
            )
        })
    )
}

export default ItemTree