
import Box from '@mui/material/Box';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


// Part of Admin layout from Material UI
export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 5, padding: "40px 0px 40px 40px" }}>
            <div>{children}</div>
            </Box>
        )}
        </div>
    );
}


export function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}