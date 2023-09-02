import React, { useEffect, useState } from 'react'
import http from 'services/httpService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Tooltip, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

const Notes = ({ itemId = null, collectionId = null }) => {

    const [itemNotes, setItemNotes] = useState([]);
    const [collectionNotes, setCollectionNotes] = useState([]);

    const fetchItemNotes = async (itemId) => {
        const res = await http.get(`/items/${itemId}/notes`);
        setItemNotes(res.data.data);

    }
    const fetchCollectionNotes = async (collectionId) => {
        const res = await http.get(`/collections/${collectionId}/notes`);
        setCollectionNotes(res.data.data);

    }
    useEffect(() => {
        fetchItemNotes(itemId);
        fetchCollectionNotes(collectionId)
    }, [itemId, collectionId])

    const deleteItemNoteHandler = (id) => {
        http.delete(`/notes/${id}`).then((res) => {
            toast("item note delete")
            fetchItemNotes(itemId)
        }).catch((err) => console.log(err))
    }
    const deleteCollectionNoteHandler = (id) => {
        http.delete(`/notes/${id}`).then((res) => {
            toast("collection note delete")
            fetchCollectionNotes(collectionId)
        }).catch((err) => console.log(err))
    }
    return (<>

        <Box sx={{ border: "1px solid", borderRadius: "10px", display: "flex", margin: "4px" }}>
            <Box sx={{ borderRight: "1px solid" }}>

                {

                    itemNotes ? <Box sx={{ padding: "4px", margin: "4px" }}>  <Typography sx={{ fontSize: "18px" }} variant="h5">item notes</Typography>{

                        itemNotes.map(note => (
                            <Box key={note._id} sx={{
                                padding: "4px", margin: "4px", display: "flex", flexDirection: "column", overflow: "hidden",
                                "&:not(:last-child)": {
                                    borderBottom: "1px solid", // Define the style for non-last elements
                                },
                            }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                    <Tooltip title={note.text} placement="top-start">
                                        <Box sx={{ width: "96px" }}>
                                            {note.text}
                                        </Box>
                                    </Tooltip>
                                    <Box>
                                        <DeleteIcon onClick={() => deleteItemNoteHandler(note._id)} />
                                    </Box>
                                </Box>
                            </Box>
                        ))}</Box> : <Box>
                        No notes found for this Item!
                    </Box>
                }
            </Box>
            <Box sx={{ borderRight: "1px solid" }}>
                {
                    collectionNotes ? <Box sx={{ padding: "4px", margin: "4px" }}>
                        <Typography sx={{ fontSize: "18px" }} variant="h5">collection notes</Typography>
                        {collectionNotes.map(note => (
                            <Box key={note._id} sx={{
                                padding: "4px", margin: "4px", display: "flex", flexDirection: "column", overflow: "hidden",

                                "&:not(:last-child)": {
                                    borderBottom: "1px solid", // Define the style for non-last elements
                                },
                            }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                    <Tooltip title={note.text} placement="top-start">
                                        <Box sx={{ width: "96px" }}>
                                            {note.text}
                                        </Box>
                                    </Tooltip>
                                    <Box>
                                        <DeleteIcon onClick={() => deleteCollectionNoteHandler(note._id)} />
                                    </Box>
                                </Box>
                            </Box>
                        ))}</Box> : <Box>
                        No notes found for this collection!
                    </Box>
                }
            </Box>
        </Box >
    </>
    )
}

export default Notes