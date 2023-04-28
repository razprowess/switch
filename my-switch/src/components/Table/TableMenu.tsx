
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {  Profile, Accept } from '../Actions';
import { RowData } from '../../components/Table';
import { UPDATE_FOLLOWER } from '../../types/graphSchema';
import { useMutation } from '@apollo/client';


interface DefaultMenuProps {
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  anchorEl: HTMLElement | null;
  rowData: RowData;
  onAccepted: ()=>void;
}

export const TableMenu = ({ isMenuOpen, handleMenuClose, anchorEl, rowData, onAccepted }: DefaultMenuProps) => {
const {username, id } = rowData;
  const navigate = useNavigate();
 const [updateMenteeStatus] = useMutation(UPDATE_FOLLOWER, { onCompleted(){
        onAccepted();
 }});


  const handleProfile = () => {
    handleMenuClose();
    navigate(`/${username}`);
  }

  const handleAcceptMenu = () => {
    handleMenuClose();
    updateMenteeStatus({variables: {menteeid: id}})
  }


  return (<Menu anchorEl={anchorEl} id="table-menu" keepMounted open={isMenuOpen} onClose={handleMenuClose}>
      <>
        <MenuItem onClick={handleProfile}>
          <Profile disableTooltip />
          Profile
        </MenuItem>
        <MenuItem onClick={handleAcceptMenu}>
        <Accept disableTooltip />
          Accept
        </MenuItem>
      </>
  </Menu>)
};