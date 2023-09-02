import Header from '@/containers/Layout/Header'
import Footer from "@/containers/Layout/Footer"
const Layout = ({ children }) => {
    return (
        <div className='bg-gray-50 min-h-screen'>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;