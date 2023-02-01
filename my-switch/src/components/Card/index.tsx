import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type BasicCardProps = {
cardContent: string;
number: number;
}


export default function BasicCard({cardContent, number}: BasicCardProps) {
  return (
    <Card sx={{ minWidth: 275, m: 3, backgroundColor: 'text.info' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography variant="h5" component="div">
          {cardContent}
        </Typography>
        <Typography variant="h2">
          {number} 
        </Typography>
      </CardContent>
    </Card>
  );
}
