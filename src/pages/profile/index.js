import { Box, CircularProgress, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import http from 'services/httpService'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import Image from 'next/image';



const ProfilePageBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
}))



const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        http.get('/users/me').then((res) => {
            setUser(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    if (!user) return <CircularProgress />
    //  
    return (
        <>
            <ProfilePageBox sx={{ marginX: "auto", padding: "8px 16px", height: "80vh" }}>
                {user && <Image src={`http://localhost:5000/api/profiles/${user.email}.jpg`} alt="user profile picture" width={100} height={100} />}
                <ProfilePageBox sx={{ padding: "10px", borderRadius: "10px", }}>
                    <ProfilePageBox sx={{ display: "flex", padding: "10px", borderRadius: "10px", gap: "10px", marginBottom: "8px" }}>
                        <PersonIcon />
                        <ProfilePageBox>name</ProfilePageBox>
                        <ProfilePageBox>
                            {user.name}
                        </ProfilePageBox>
                    </ProfilePageBox>
                    <ProfilePageBox sx={{ display: "flex", padding: "10px", borderRadius: "10px", gap: "10px", marginBottom: "8px" }}>
                        <EmailIcon />
                        <ProfilePageBox>email</ProfilePageBox>
                        <ProfilePageBox>
                            {user.email}
                        </ProfilePageBox>
                    </ProfilePageBox>
                    <ProfilePageBox sx={{ display: "flex", padding: "10px", borderRadius: "10px", gap: "10px" }}>
                        <GroupsIcon />
                        <ProfilePageBox>role</ProfilePageBox>
                        <ProfilePageBox>
                            {user.role}
                        </ProfilePageBox>
                    </ProfilePageBox>
                </ProfilePageBox>
            </ProfilePageBox>
        </>
    )
}

export default Profile