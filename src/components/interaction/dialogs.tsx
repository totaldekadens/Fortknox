import { FC, useContext } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import { Product } from "../../data/products";

interface Props {
    handleClose?: (answer: boolean) => void
    product: Product
    open: boolean
    message?: string
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    color?: string
    title?: string
}

// AlertDialog to delete button atm
const DialogWindow: FC<Props> = (props) => {

    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Ta bort produkt"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Är du säker på att du vill radera {props.product.name} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {props.handleClose!(false)}}>Nej!</Button>
                <Button onClick={() => {props.handleClose!(true)}} autoFocus>Ja</Button>
            </DialogActions>
        </Dialog>
    )
}

// InformationDialog 
export const DialogInfoWindow: FC<Props> = (props) => {
    const handleClose = (answer: boolean) => {
        props.setOpen!(false);
    };
    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{color: props.color}} id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message!}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {handleClose(false)}} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    )
}


export default DialogWindow