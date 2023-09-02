import { Box, Typography, styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'


const Container = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
    padding: "8px 16px"
}))

const GitRepos = () => {
    return (
        <Container sx={{ height: "100vh" }}>
            <Box>
                <Typography>
                    <Link href="https://github.com/alisalehinia/zotero-clone">frontend</Link>
                </Typography>
                <Typography>
                    <Link href="https://github.com/Adjective10111/zotero-clone">backend</Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default GitRepos