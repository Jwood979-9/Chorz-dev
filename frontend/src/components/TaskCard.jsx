import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const bull = (
  <Box
    component="span"
    sx={{   display: 'inline-block', mx: '2px', transform: 'scale(.5)' }}
  >
    •
  </Box>
);



export default function OutlinedCard({task,onDelete}) {
    
  return (
    <Box sx={{ minWidth: 0 }} >
      <Card variant="outlined" sx={{ borderColor:'white', borderStyle:'solid',fontFamily:'ui-sans-serif' , minWidth: 0 ,width:400, color:'white', backgroundColor: '#121A21',boxShadow: '18px 10px 12px rgba(25, 118, 210, 0.3)'}}>
      
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div"  gutterBottom sx={{fontFamily:'ui-sans-serif', color: 'white', fontSize: 25 }}>
        
       <>{task.title}</> 
      </Typography>
      <Typography variant="h9" component="div" sx={{fontSize: 12}}>
        Shifts: Opening | Dept: Treatment Floor
         <br />
        <>{task.status}</> 
        
       </Typography>
       <Typography variant="h9" component="div">
        Assigned:Everyone
       </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => onDelete(task.id)} style={{color:'red',fontSize:"10px", padding: '2px' , background:'grey', borderRadius: 'px' , size:10,boxShadow: '2px 4px 9px rgba(187, 8, 8, 0.3)'}} size="small">Delete</Button>
    </CardActions>
  </React.Fragment>
</Card>
    </Box>
  );
}
