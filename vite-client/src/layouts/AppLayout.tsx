import { Outlet } from 'react-router-dom'
import AuthWrapper from '../utils/AuthWrapper';

type Props = {}

function AppLayout({ }: Props) {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthWrapper(AppLayout);