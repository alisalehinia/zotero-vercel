import { Box, Typography, styled } from '@mui/material'
import React from 'react'


const Container = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
    padding: "8px 16px"
}))
const Privacy = () => {
    return (
        <Container>
            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Privacy Policy for zotero
            </Typography>
            <Typography variant="p">
                At zotero, accessible from https://zotero-test.iran.liara.run/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by zotero and how we use it.<br />

                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.<br />

                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in zotero. This policy is not applicable to any information collected offline or via channels other than this website.<br />
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Consent
            </Typography>
            <Typography variant="p">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Information we collect
            </Typography>
            <Typography variant="p">
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.<br />

                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.<br />

                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.<br />
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                How we use your information
            </Typography>
            <Typography variant="p">
                We use the information we collect in various ways, including to:<br />
                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                    <li>Send you emails</li>
                    <li>Find and prevent fraud</li>
                </ul>
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Log Files
            </Typography>
            <Typography variant="p">
                zotero follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users movement on the website, and gathering demographic information.
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Cookies and Web Beacons
            </Typography>
            <Typography variant="p">
                Like any other website, zotero uses cookies. These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users experience by customizing our web page content based on visitors browser type and/or other information.
            </Typography>

            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Advertising Partners Privacy Policies
            </Typography>
            <Typography variant="p">
                You may consult this list to find the Privacy Policy for each of the advertising partners of zotero.

                Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on zotero, which are sent directly to users browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.

                Note that zotero has no access to or control over these cookies that are used by third-party advertisers.
            </Typography>


            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Third Party Privacy Policies
            </Typography>
            <Typography variant="p">
                zoteros Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

                You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers respective websites.
            </Typography>


            <Typography sx={{ marginTop: "18px" }} variant="h4">
                CCPA Privacy Rights (Do Not Sell My Personal Information)
            </Typography>
            <Typography variant="p">
                Under the CCPA, among other rights, California consumers have the right to:

                Request that a business that collects a consumers personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.

                Request that a business delete any personal data about the consumer that a business has collected.

                Request that a business that sells a consumers personal data, not sell the consumers personal data.

                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </Typography>


            <Typography sx={{ marginTop: "18px" }} variant="h4">
                GDPR Data Protection Rights
            </Typography>
            <Typography variant="p">
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

                The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

                The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

                The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

                The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

                The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

                The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </Typography>



            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Childrens Information
            </Typography>
            <Typography variant="p">
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

                zotero does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </Typography>



            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Changes to This Privacy Policy
            </Typography>
            <Typography variant="p">
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.

                Our Privacy Policy was created with the help of the Privacy Policy Generator.
            </Typography>



            <Typography sx={{ marginTop: "18px" }} variant="h4">
                Contact Us
            </Typography>
            <Typography variant="p">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </Typography>
        </Container>
    )
}

export default Privacy