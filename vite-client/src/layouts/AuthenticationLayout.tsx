import { Outlet } from 'react-router-dom'

type Props = {}

export default function AuthenticationLayout({ }: Props) {
    return (
        <div className='flex h-screen justify-center items-center'>
            <Outlet />
        </div>
    )
}