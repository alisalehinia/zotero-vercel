import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import http from 'services/httpService';

export default function AddNewAttachmentType() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [name, setName] = React.useState("");
    const [api, setApi] = React.useState("");
    const [inputMetaData, setInputMetaData] = React.useState("");
    const [metaDataKeys, setMetaDataKeys] = React.useState([]);

    const submitMetaData = (name, api, metaDataKeys) => {
        console.log(name,
            api,
            metaDataKeys);
        http.post('/attachmentTypes', {
            name, name,
            api: api,
            metadataKeys: metaDataKeys
        }).then((res) => {
            console.log(res);
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create New Attachment Type
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Enter metadata details"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Item name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="api" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter metadata api</InputLabel >
                        <Input id="api" label="api" error={false} variant="outlined" value={api} onChange={(e) => {
                            setApi(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="key" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter metadata key</InputLabel >
                        <Input id="key" label="key" error={false} variant="outlined" value={inputMetaData} onChange={(e) => {
                            setInputMetaData(e.target.value);
                        }} />
                    </Box>
                    {metaDataKeys.length > 0 &&
                        <Box sx={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                            <Box>added keys:</Box>
                            <Box sx={{ display: "flex", gap: "4px" }}>
                                {metaDataKeys.map((key, index) => (
                                    <Box key={key}>
                                        {key}{index !== metaDataKeys.length - 1 ? " , " : ""}
                                    </Box>
                                ))}
                            </Box>
                        </Box>}
                    <Button onClick={() => {
                        if (inputMetaData.length === 0) return;
                        setMetaDataKeys((prev) => [...prev, inputMetaData]);
                        setInputMetaData("");
                    }}>add </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        submitMetaData(name, api, metaDataKeys)
                        handleClose()
                    }} autoFocus>
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}