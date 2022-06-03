import { FC } from "react"
import Button from '@mui/material/Button';
import { buttonStyle } from "../../style/common";


interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteButton: FC<Props> = (props) => {
    
    const handleClickOpen = () => {
        props.setOpen(true);
    };

    return (
        <div style={{display: "flex", alignItems:"flex-end", justifyContent: "flex-end" , width: "100%", marginTop: "10px"}}>
            <Button onClick={(e) => {handleClickOpen()}} sx={{...buttonStyle, borderColor: "red", color: "red"}} variant="outlined">Ta bort</Button>
        </div>
    )
}

export default DeleteButton