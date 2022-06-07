import  { FC, useContext } from "react"
import { DeviceContext} from "./../context/provider";
import TabPanelAdmin from "../adminParts/tabPanelAdmin";
import SimpleAccordion from "../adminParts/accordionAdmin";

const AdminPanel : FC = () => { 

    const { devices } = useContext(DeviceContext)

    return (
        devices.isDesktop ? <TabPanelAdmin/> : devices.isTablet ? <TabPanelAdmin/> : devices.isMobile ? <SimpleAccordion /> : <SimpleAccordion />
    )
}

export default AdminPanel