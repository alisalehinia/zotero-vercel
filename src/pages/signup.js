
import Head from "next/head"
import Link from "next/link"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CircularIndeterminate from "@/components/circularProgress.js"
import { Box, InputLabel, Typography } from "@mui/material"
import { FormContainer } from "styles/auth"
import { Title } from "styles/body"
import { Input, MyButton } from "styles/input"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"


const RegisterForm = () => {
    const dispatch = useAuthActions();
    const { user, loading } = useAuth();
    const router = useRouter();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { locale } = useRouter()
    const { t: translate } = useTranslation('signup')


    const handleSubmit = () => {
        dispatch({ type: "SIGNUP", payload: { name: name, email: email, password, password } })

    }
    const formIsValid = () => {
        let valid = true;
        if (password !== confirmPassword) {
            valid = false
        }
        return valid;
    }
    useEffect(() => {
        if (user) router.push("/");
    }, [user])

    if (loading) return <CircularIndeterminate />

    return (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "4px" }}>
            <Head>
                <title>Zotero | signup</title>
            </Head>
            <FormContainer>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <Title variant="h4">{translate('signup-title')}</Title>
                    <InputLabel htmlFor="name" sx={{ fontSize: "16px", margin: "5px" }}>{translate('name-label')}</InputLabel >
                    <Input id="name" label={translate('name')} error={false} variant="outlined" value={name} onChange={(e) => {
                        setName(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="email" sx={{ fontSize: "16px", margin: "5px" }}>{translate('email-label')}</InputLabel >
                    <Input id="email" label={translate('email')} error={false} variant="outlined" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="password" sx={{ fontSize: "16px", margin: "5px" }}>{translate('password-label')}</InputLabel >
                    <Input label={translate('password')} id="password" type="password" error={false} variant="outlined" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                    <InputLabel htmlFor="confirmPassword" sx={{ fontSize: "16px", margin: "5px" }}>{translate('confirm-password')}</InputLabel >
                    <Input label={translate('confirm-password')} id="confirmPassword" type="password" error={false} variant="outlined" value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        formIsValid
                    }} />
                </Box>
                <MyButton disabled={!formIsValid} onClick={handleSubmit} variant="contained">{translate('signup-button')}</MyButton>
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                    <Typography variant="caption">
                        {translate('have-account')}
                    </Typography>
                    <Link href="/login" className="text-blue-500">
                        {translate('login')}
                    </Link>
                </Box>
            </FormContainer>
        </Box>
    )
}

export default RegisterForm;

export async function getStaticProps({ locale }) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['signup']))
        }
    }
}