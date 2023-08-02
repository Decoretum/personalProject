import { Container, Typography, Box, Grid, Divider, List, ListItem } from "@mui/material";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from "next/link";

export default function Info({props}){
    console.log(props)
    const obj = props;
    return (
        <Container>
            <Typography variant='h4'> 
                Achievement {obj.id} 
                <Link href={`/Achievements/${obj.id}/edit`} style={{marginLeft: '2vw'}}>
                    <EditOutlinedIcon />
                </Link>
            </Typography>
            <Box style={{backgroundColor: 'ivory',boxShadow: '0 0 10px #ccc', borderRadius: '9px', width: '60vw', marginTop: '2vh', padding: '15px'}}>
                <Grid container>
                    <Grid item>
                        <EmojiEventsOutlinedIcon />
                    </Grid>
                    <Grid item style={{marginLeft: '2vw'}}>
                        <Typography variant='h6'> {obj.title} </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <List>
                    <ListItem> {obj.description} </ListItem>
                    {obj.duration !== null ? (
                        <ListItem style={{marginTop: '2vh'}}> No indicated duration </ListItem>
                    ) : (
                        <ListItem style={{marginTop: '2vh'}}> Duration: {obj.duration} </ListItem>
                    )

                    }
                    
                </List>

                

            </Box>
        </Container>
    )
}