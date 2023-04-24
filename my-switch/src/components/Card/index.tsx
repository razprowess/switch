import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BLACK_COLOR, LIGHT_MODE_THEME, WHITE_COLOR } from '../../utils/constants';

type BasicCardProps = {
cardContent: string;
number: number;
}


export default function BasicCard({cardContent, number}: BasicCardProps) {
  return (
    <Card elevation={2}  sx={(theme)=>({ minWidth: 350,width: 'auto', m: 1, 
    bgcolor: theme.palette.mode === LIGHT_MODE_THEME ? WHITE_COLOR : BLACK_COLOR, flex: 1, borderRadius: '10px', '&:hover': {boxShadow: '0px 10px 5px lightgrey'}})}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography variant="h6" component="div" sx={{fontWeight: 'normal', mt: 1}}>
          {cardContent}
        </Typography>
        <Typography variant="body1" sx={{fontSize: '1.5em'}}>
          {number} 
        </Typography>
      </CardContent>
    </Card>
  );
}
