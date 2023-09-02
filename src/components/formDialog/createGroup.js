import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import http from 'services/httpService';


export default function CreateGroupDialog() {
    const [open, setOpen] = React.useState(false);

    // ! group data ---------------- 
    const [name, setName] = React.useState("");
    const [members, setMembers] = React.useState([]);

    const [enteredUser, setEnteredUser] = React.useState({});
    const [canAdd, setCanAdd] = React.useState(false);
    const [canEdit, setCanEdit] = React.useState(false);
    const [canDelete, setCanDelete] = React.useState(false);


    // ! ---------------------------


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // !-----------submit formdata
    const handleSubmit = async (name, members) => {
        try {
            const res = await http.post('/groups', { name: name, members: JSON.stringify(members) });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        // This will log the updated state value after each state update
        console.log(members);
    }, [members]);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create new Group
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create new Group? "}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter group name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="user Id" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter user Id</InputLabel >
                        <Input id="user Id" label="user Id" error={false} variant="outlined" value={enteredUser.user} onChange={(e) => {
                            setEnteredUser((prev) => ({ ...prev, user: e.target.value }));

                        }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="can add" sx={{ fontSize: "16px", margin: "8px" }}>can add</InputLabel >
                        <Checkbox
                            checked={canAdd}
                            // onChange={(e) => setCanAdd((canAdd) => !canAdd)}
                            onChange={() => {
                                setCanAdd((prev) => !prev)
                                setEnteredUser((prev) => ({ ...prev, canAdd: !canAdd }));
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="can edit" sx={{ fontSize: "16px", margin: "8px" }}>can edit</InputLabel >
                        <Checkbox
                            checked={canEdit}
                            // onChange={(e) => setCanAdd((canAdd) => !canAdd)}
                            onChange={() => {
                                setCanEdit((prev) => !prev)
                                setEnteredUser((prev) => ({ ...prev, canEdit: !canEdit }));
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="can delete" sx={{ fontSize: "16px", margin: "8px" }}>can delete</InputLabel >
                        <Checkbox
                            checked={canDelete}
                            // onChange={(e) => setCanAdd((canAdd) => !canAdd)}
                            onChange={() => {
                                setCanDelete((prev) => !prev)
                                setEnteredUser((prev) => ({ ...prev, canDelete: !canDelete }));
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                    <Button onClick={() => {
                        setMembers((prev) => ([...prev, enteredUser]))
                    }}>add user</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        handleSubmit(name, members)
                        handleClose()
                    }} autoFocus>
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}