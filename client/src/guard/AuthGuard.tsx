import {Navigate, Outlet} from 'react-router-dom';
import { STORAGE_CONSTANTS } from '@/utils/constants';

export default function AuthGuard() {
    const isLogin = localStorage.getItem(STORAGE_CONSTANTS.isLogin);
    return isLogin ? <Outlet/> : <Navigate to='/login' replace/>
}