import { ExpandMoreIcon, ChevronRightIcon } from "@mui/icons-material"

import { TreeItem, TreeView } from '@mui/lab'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteCollectionByIdAsync, fetchLibraryCollections } from "store/collection/collection-actions";
import ItemTree from "./ItemTree";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchCollectionItems } from "store/item/item-actions";
import UpdateCollectionFormDialog from "../formDialog/updateCollection";
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from "styles/theme";
import AddNewItemDialog from "../formDialog/addItem";
import AddNoteToCollectionDialog from "../formDialog/addNoteToCollection";
import { useUIContext } from "@/context/ui";

const CollectionTree = ({ libraryId }) => {

    const { setSelectedCollection } = useUIContext();
    const dispatch = useDispatch();

    // ! delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // ! selected collection to delete
    const [collectionToDelete, setCollectionToDelete] = useState();

    // ! delete collection by Id
    const handleCollectionDelete = (collectionId) => {
        dispatch(deleteCollectionByIdAsync(libraryId, collectionId));
    };

    //! menu states
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event, collection) => {
        setAnchorEl(event.currentTarget);
        setCollectionToDelete(collection);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCollectionToDelete(null);
    };

    const collections = useSelector((state) => state.collection.library);
    const loading = useSelector((state) => state.collection.loading);


    useEffect(() => {
        dispatch(fetchLibraryCollections(libraryId))
    }, [libraryId, dispatch])

    if (loading) {
        return (
            <CircularProgress />
        )
    }
    return (
        collections[libraryId].map((collection) => {
            return (
                <div key={collection._id} className='w-full flex items-start justify-start' onClick={() => setSelectedCollection(collection._id)}>
                    <div className='flex-grow mt-2'>
                        <TreeItem key={collection._id}

                            nodeId={collection._id}
                            node={collection._id}
                            label={collection.name}
                            onClick={() => dispatch(fetchCollectionItems(collection._id))}
                        >
                            <ItemTree collectionId={collection._id} />
                        </TreeItem>
                    </div>
                    <Box>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuClick(event, collection)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id={`long-menu-${collection._id}`}
                            MenuListProps={{
                                'aria-labelledby': `long-button-${collection._id}`,
                            }}
                            anchorEl={anchorEl}
                            open={open && collectionToDelete === collection}
                            onClose={handleClose}

                        >
                            {/* //! update collection */}
                            <MenuItem>
                                <UpdateCollectionFormDialog text="update collection" libraryId={libraryId} collectionId={collection._id} menuClose={handleClose} />
                            </MenuItem>
                            {/* //! add new item */}
                            <MenuItem>
                                <AddNewItemDialog text="add new item" collectionId={collection._id} menuClose={handleClose} />
                            </MenuItem>
                            {/* //! add note to collection */}
                            <MenuItem>
                                <AddNoteToCollectionDialog dialogText="add note" collectionId={collection._id} libraryId={libraryId} />
                            </MenuItem>
                            {/* //! delete collection */}
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
                                        {"Are you sure you want to delete a collection?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Cancel to close window
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                                        <Button sx={{ color: Colors.danger }} onClick={() => {
                                            handleCollectionDelete(collection._id)
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

export default CollectionTree