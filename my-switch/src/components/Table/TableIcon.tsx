import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import IconButton from '@mui/material/IconButton';
import { RowData } from '../../components/Table';
import { useState } from 'react';
import { TableMenu } from './TableMenu';

type TableIconProps = {
row: RowData;
onAccepted: ()=>void;
}

export const TableIcon = (props: TableIconProps)=>{
    const {row, onAccepted} = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


const handleIconClick = (event: React.MouseEvent<HTMLElement>)=>{
setAnchorEl(event.currentTarget)
}

const handleClose = () => {
    setAnchorEl(null);
  };
  
    return (
        <>
        <IconButton id="table-menu" onClick={handleIconClick}><MoreVertSharpIcon/></IconButton>
        <TableMenu isMenuOpen={open} anchorEl={anchorEl} handleMenuClose={handleClose} rowData={row} onAccepted={onAccepted}/>
        </>
    )

}