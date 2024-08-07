import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
    return (
        <div className='account-page bg-[--form-bg-main]'>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AccountLayout