import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const auth = useSelector((state) => state.auth);
    if(!auth.isAdmin) return <div className="content_container_blank"><p>Access denied.</p></div>
    
    return ( 
        <div className="content_container_blank_admin" > 
            

            <SideBar/>
            <div className="dashboard_content">
                <Outlet/>
            </div>

        </div>
     );
}
 
export default Dashboard;