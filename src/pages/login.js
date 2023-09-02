
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import CircularIndeterminate from "@/components/circularProgress.js"
import { FormContainer } from "styles/auth"
import { Box, Typography, InputLabel, Button } from "@mui/material"
import { Input } from "/styles/input"
import { MyButton } from "styles/input"
import { Colors } from "styles/theme"
import { Title } from "styles/body"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const RegisterForm = () => {
    const router = useRouter();
    const dispatch = useAuthActions();
    const { user, loading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { locale } = useRouter()
    const { t: translate } = useTranslation('login')


    const handleSubmit = () => {
        dispatch({ type: "SIGNIN", payload: { email: email, password: password } })
    }
    const formIsValid = () => {
        let valid = true;
        if (email.length === 0 || !email.includes("@")) {
            valid = false;
        }
        if (password.length < 8) {
            valid = false;
        }
        return valid;
    }
    useEffect(() => {
        if (user) {
            console.log(user);
            router.push("/");
        }
    }, [user])

    if (loading) return <CircularIndeterminate />

    return <Box sx={{ display: "flex", justifyContent: "center", margin: "4px" }}>
        <Head>
            <title>Zotero | login</title>
        </Head>
        <FormContainer>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                {/* <Title variant="h4">Login page</Title> */}
                <Title variant="h4">{translate('login-title')}</Title>
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
            <MyButton disabled={!formIsValid} onClick={handleSubmit} variant="contained">{translate('login-button')}</MyButton>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                <Typography variant="caption">
                    {translate('have-account')}
                </Typography>
                <Link href="/signup" className="text-blue-500">
                    {translate('sign-up')}
                </Link>
            </Box>
        </FormContainer>
    </Box>

}

export default RegisterForm;

export async function getStaticProps({ locale }) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['login']))
        }
    }
}