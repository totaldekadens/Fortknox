import  { FC, useContext } from "react"
import { DeviceContext} from "./../context/provider";
import TabPanelAdmin from "../admin/tabPanelAdmin";
import SimpleAccordion from "../admin/accordionAdmin";

const AdminPanel : FC = () => { 

    const { devices } = useContext(DeviceContext)

    return (
        devices.isDesktop ? <TabPanelAdmin/> : devices.isTablet ? <TabPanelAdmin/> : devices.isMobile ? <SimpleAccordion /> : <SimpleAccordion />
    )
}

export default AdminPanel