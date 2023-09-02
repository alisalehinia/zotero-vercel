import { useUIContext } from '@/context/ui';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import http from 'services/httpService';



const TagBox = () => {
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();

    const { selectedTag, setSelectedTag } = useUIContext();
    const { selectedItem, setSelectedItem,
        selectedCollection, setSelectedCollection,
        selectedLibrary, setSelectedLibrary
    } = useUIContext();


    const [filteredItems, setFilteredItems] = useState();
    const [filteredCollections, setFilteredCollections] = useState();
    const [filteredLibraries, setFilteredLibraries] = useState();

    // !----------dialog states
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // !----------

    useEffect(() => {
        {
            selectedItem ?   //! fetch all tags of users
                http.get(`/tags/item/${selectedItem}`).then((res) => {
                    setTags(res.data.data);
                    console.log(" item tags", res);

                }).catch((err) => console.log(err))
                : selectedCollection ?
                    http.get(`/tags/collection/${selectedCollection}`).then((res) => {  //! fetch tags that are in specific collection
                        setTags(res.data.data);
                        console.log(" collection tags", res);

                    }).catch((err) => console.log(err))
                    : selectedLibrary ?
                        http.get(`/tags/library/${selectedLibrary}`).then((res) => { //! fetch tags that are in specific library
                            setTags(res.data.data);
                            console.log(" collection tags", res);

                        }).catch((err) => console.log(err))
                        : http.get(`/tags`).then((res) => { //! fetch tags that are in specific item
                            setTags(res.data.data);
                            console.log("tags", res);

                        }).catch((err) => console.log(err))
        }
    }, [selectedItem, selectedCollection, selectedLibrary])
    const filterItemsByTag = (tag) => {
        if (selectedTag?.name === tag.name && selectedTag?.color === tag.color) {
            setSelectedTag(null);
            return;
        }

        setSelectedTag(tag);

        http.get(`/tags/items?${tag._id}`).then((res) => {
            console.log(res);
            setFilteredItems(res.data.data);
        }).catch((err) => console.log(err))
        http.get(`/tags/collections?${tag._id}`).then((res) => {
            console.log(res);
            setFilteredCollections(res.data.data);
        }).catch((err) => console.log(err))
        http.get(`/tags/libraries?${tag._id}`).then((res) => {
            console.log(res);
            setFilteredLibraries(res.data.data);
        }).catch((err) => console.log(err))
        // handleClickOpen()
        console.log("item=>", filteredItems, "collection=>", filteredCollections, "library=>", filteredLibraries);
        dispatch(libraryActions.fetchUserLibrariesSuccess(filteredLibraries));

    }
    return (
        <>
            <Button variant="outlined" sx={{
                margin: "10px",
                cursor: "pointer",
                backgroundColor: "#3b82f6",
                padding: "5px 10px",
                borderRadius: "10px",
                color: "white"
            }}
                onClick={() => {
                    setSelectedItem(null)
                    setSelectedCollection(null)
                    setSelectedLibrary(null)
                }} >All Tags</Button>
            <Button onClick={() => {
                dispatch(fetchUserLibraries());
            }}
                sx={{ color: Colors.danger }}
            >disable filter</Button>

            <div className='flex flex-wrap gap-2 p-1 font-thin'>
                {tags.map((tag) => (
                    <Box key={tag._id} sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        border: "1px solid",
                        borderRadius: "5px",
                        padding: "4px",
                        margin: "4px",
                        backgroundColor: (selectedTag?.name == tag.name && selectedTag?.color === tag.color) ? "white" : "",
                        color: (selectedTag?.name == tag.name && selectedTag?.color === tag.color) ? "#444" : "",
                        '&:hover': {
                            backgroundColor: 'white',
                            color: "#444"
                        },
                    }} onClick={() => {

                        filterItemsByTag(tag)
                    }}>
                        <Box>
                            name: {tag._id}
                        </Box>
                        <Box
                            sx={{
                                border: '1px solid',
                                height: 16,
                                margin: '2px',
                            }}
                        />
                        <Box>
                            color: {tag.color}
                        </Box>
                    </Box>
                ))}
                <FilteredItems filteredData={filteredItems}
                    handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default TagBox

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Colors } from 'styles/theme';
import { useDispatch } from 'react-redux';
import { libraryActions } from 'store/library/library-slice';
import { fetchUserLibraries } from 'store/library/library-actions';

export function FilteredItems({ filteredData, handleClickOpen, handleClose, open, setOpen }) {
    //   const [open, setOpen] = React.useState(false);

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        filtered items:
      </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"item data"}
                </DialogTitle>
                <DialogContent>
                    {filteredData?.map((data) => (
                        <Box key={data._id}>
                            <FilteredDataComponent data={data} />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

const FilteredDataComponent = ({ data }) => {
    const [lib, setLib] = useState(null)
    const [col, setCol] = useState(null)
    useEffect(() => {
        http.get(`/libraries/${data.library}`).then((res) => {
            setLib(res.data.data)
        }).catch((err) => console.log(err))
        http.get(`/collections/${data.parentCollection}`).then((res) => {
            setCol(res.data.data)
        }).catch((err) => console.log(err))
    }, [])

    return <Box sx={{ display: "flex", gap: "12px", backgroundColor: "#1f2937", margin: "5px", padding: "5px", borderRadius: "10px" }}>
        <Box> name: {data.name}</Box>
        <Box>library: {lib?.name}</Box>
        <Box>collection: {col?.name}</Box>
    </Box>

}