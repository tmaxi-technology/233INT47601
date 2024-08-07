import ScrollToTopButton from '../Share/ScrollTop/ScrollTopButton'
import { Outlet } from 'react-router-dom'
import Header from '../Share/Header/Header'
import Footer from '../Share/Footer/Footer'

const RootLayout = () => {
    return (
        <div className='root-layout bg-[--form-bg-main]'>
            <Header />
            <ScrollToTopButton />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default RootLayout