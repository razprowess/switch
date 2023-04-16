
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogTitle, DialogContent, DialogContentText, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const AlertDialogue = () => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 5000)
    }, [])

    const handleClose = (e: any) => {
        const { value } = e.target;
        if (value === 'YES') {
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
                <DialogTitle id="alert-dialog-title" sx={{ marginLeft: '20px' }}>
                    {open ? (
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                    <Typography variant='h4' sx={{ textDecoration: 'none', fontWeight: 'bold', marginTop: '20px' }}>Become a Mentor?</Typography>
                </DialogTitle>
                <DialogContent sx={{ marginLeft: '20px', marginRight: '20px' }}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography paragraph mb={2}> Let join hands to be part of other people's success by providing timely guide and tips for the
                            their journey.</Typography>

                        <Typography paragraph>Would you like to be a mentor at your convinient, impact, and shape other people's career
                            in a convinient atmosphere?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ marginLeft: '35px', marginRight: '20px', marginBottom: '30px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button sx={{ mr: 2, mb: 1, borderRadius: '25px' }} onClick={handleClose} fullWidth value="YES" variant='contained' size='large'>YES</Button>
                    <Button sx={{ mr: 2, mb: 1, borderRadius: '25px' }} onClick={handleClose} fullWidth value="NO" variant='outlined' size='large' autoFocus>
                        NO
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AlertDialogue