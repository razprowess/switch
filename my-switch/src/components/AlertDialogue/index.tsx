
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle, DialogContent, DialogContentText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AlertDialogue = () => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 5000)
    }, [])

    const handleClose = (e: any) => {
        const {value} = e.target; 
        if(value === 'YES'){
        setOpen(false);
        navigate('/mentor');
        }
        setOpen(false);
    };

    return (
        <Box>
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Become a Mentor?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let join hands to be part of other people's success by providing timely guide and tips for the
                        their journey.
                        <br/>
                        Would you like to be a mentor at your convinient, impact, and shape other people's career 
                        in a convinient atmosphere?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{mr: 2, mb: 1}}onClick={handleClose} value="YES" variant='outlined'>YES</Button>
                    <Button sx={{mr: 2, mb: 1}} onClick={handleClose} value="NO" variant='outlined' autoFocus>
                        NO
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AlertDialogue