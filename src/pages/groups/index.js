import { Box, Checkbox, InputLabel, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import http from 'services/httpService'

import GroupIcon from '@mui/icons-material/Group';
import CreateGroupDialog from '@/components/formDialog/createGroup';
import LibraryTree from '@/components/treeView/libraryTree';


const GroupPageBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
    width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr",
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
    }
}))

const GroupsPage = () => {



    const [userGroups, setUserGroups] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupLibraries, setGroupLibraries] = useState([]);

    useEffect(() => {
        http.get(`/groups`).then((res) => setUserGroups(res.data.data)).catch((err) => console.log(err))
        {
            selectedGroup && http.get(`/libraries?group=${selectedGroup._id}`).then((res) => {
                setGroupLibraries(res.data.data)
            }).catch((err) => console.log(err))
        }

    }, [selectedGroup])
    console.log(userGroups);
    return (<GroupPageBox>
        <Box sx={{ borderRight: "1px solid", padding: "8px 16px" }}>
            <Box
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", backgroundColor: "inherit", }}>
                <Typography sx={{ padding: "8px" }} >My Groups</Typography >
                <CreateGroupDialog />
            </Box>
            <Box >
                {
                    userGroups.map(group => (
                        <Box key={group._id} sx={{
                            display: "flex",
                            borderRadius: "10px",
                            margin: "4px",
                            padding: "6px",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px solid #ccc",
                            marginBottom: "8px",
                            backgroundColor: "inherit",
                            cursor: "pointer"
                        }}
                            onClick={() => {
                                setSelectedGroup(group);
                                console.log(group._id);
                            }}
                        >
                            <Box>
                                <GroupIcon />
                            </Box>
                            <Box>{group.name}</Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                <Box>members: {" "}</Box>
                                <Box>{group.members.length}</Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                <Box>owner:{" "}</Box>
                                <Box>{group.owner.name}</Box>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
        <Box sx={{ backgroundColor: "inherit", height: "90vh", padding: "8px" }}>
            <Box sx={{ fontWeight: "500", padding: "8px 12px", backgroundColor: "#1e40af", color: "white", borderRadius: "20px" }}>group name: {selectedGroup ? selectedGroup.name : "no selected group"}</Box>
            {selectedGroup && <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <UpdateGroupDialog groupId={selectedGroup._id} />
                <DeleteGroupDialog groupId={selectedGroup._id} />

            </Box>}
            {/* <Image src={`http://localhost:5000/${selectedGroup.logo}`} /> */}
            <Box sx={{ padding: "4px", maxHeight: "100px", overflowY: "scroll", borderRadius: "20px", padding: "8px 12px", backgroundColor: "#1d4ed8", color: "white" }}>{
                selectedGroup &&

                selectedGroup.members.map((member) => (
                    <Box key={member._id} sx={{ padding: "4px 6px" }}>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                            <Box>user id: {member._id}</Box>
                            <Box>can add: {(member.canAdd).toString()}</Box>
                            <Box>can edit: {member.canEdit.toString()}</Box>
                            <Box>can delete: {member.canDelete.toString()}</Box>
                        </Box>
                    </Box>
                ))

            }


            </Box>

            {
                groupLibraries.length > 0 ? groupLibraries.map((library) => (
                    <LibraryTree key={library._id} groupLibs={groupLibraries} />
                )) : <Box sx={{ textAlign: "center" }}>no libraries in group</Box>
            }
        </Box>
    </GroupPageBox>
    )
}

export default GroupsPage


// !-------------------- update group dialog

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from 'styles/input';
import { toast } from 'react-hot-toast';
import SettingsIcon from '@mui/icons-material/Settings';

export function UpdateGroupDialog({ groupId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // ! group data ---------------- 
    const [name, setName] = React.useState("");
    const [members, setMembers] = React.useState([]);

    const [enteredUser, setEnteredUser] = React.useState({});
    const [canAdd, setCanAdd] = React.useState(false);
    const [canEdit, setCanEdit] = React.useState(false);
    const [canDelete, setCanDelete] = React.useState(false);



    // !-----------submit formdata
    const handleSubmit = async (name, members) => {
        try {
            const res = await http.patch(`/groups/${groupId}`, { name: name, members: JSON.stringify(members) });
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
            <Button sx={{ color: "#1e3a8a" }} onClick={handleClickOpen}>
                <SettingsIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"update group?"}
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

// !-------------------- delete group dialog

import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from 'styles/theme';
export function DeleteGroupDialog({ groupId }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        http.delete(`/groups/${groupId}`).then((res) => {
            console.log(res);
            toast("group deleted");
        }).catch((err) => console.log(err))
    }
    return (
        <div>
            <Button sx={{ color: Colors.danger }} onClick={handleClickOpen}>
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"delete group"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        are you sure to delete this group?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                        handleDelete()
                    }} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

