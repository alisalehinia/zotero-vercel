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
import { Box, Checkbox, InputLabel, MenuItem, Select } from '@mui/material';
import { Input } from 'styles/input';
import { useDispatch } from 'react-redux';
import { updateLibraryByIdAsync } from 'store/library/library-actions';


export default function UpdateLibraryDialog({ text, libraryId, menuClose }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [group, setGroup] = React.useState(null);
    const [privateGroup, setPrivateGroup] = React.useState(false);

    const [allUserGroups, setAllUserGroups] = React.useState();

    const dispatch = useDispatch();

    const fetchUserGroups = () => {
        http.get("/groups").then((res) => {
            console.log(res);
            setAllUserGroups(res.data.data);
            console.log(allUserGroups);
        }).catch((err) => console.log(err))
    }
    const changeLibraryInfo = async (libraryId) => {
        const updatedData = {
            name: name,
            group: group,
            private: privateGroup
        }
        dispatch(updateLibraryByIdAsync(libraryId, updatedData))
    }
    const handleClickOpen = () => {
        setOpen(true);
        fetchUserGroups();
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
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Library name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", }}>group</InputLabel >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={group}
                            label="group"
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            {
                                allUserGroups && allUserGroups.map((group) => {
                                    return <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
                                })
                            }
                        </Select>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", margin: "8px" }}>private</InputLabel >
                        <Checkbox
                            checked={privateGroup}
                            onChange={(e) => setPrivateGroup((privateGroup) => !privateGroup)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        changeLibraryInfo(libraryId)
                        handleClose()
                        menuClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}