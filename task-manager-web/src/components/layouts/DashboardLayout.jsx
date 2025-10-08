import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const DashboardLayout = ({children,activeMenu}) => {
    const user = useSelector((state)=>state.user)
  return (
     <div className="">
    <Navbar activeMenu={activeMenu} />
    {user && (
        <div className="flex">
            <div className="max-[1080px]:hidden">
                <Sidebar activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5">{children}</div>
        </div>
    )}
  </div>
  );
}

export default DashboardLayout;