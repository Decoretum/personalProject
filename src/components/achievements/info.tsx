import { Container, Typography, Box, Grid, Divider, List, ListItem, Modal, Button } from "@mui/material";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Info({props} : any){
    const obj = props;
    const { push } = useRouter();
    const id = Number(obj.id);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const submitData = () => {
        axios.delete(`/api/achievements/${id}/delete`, {
            data: {
                ...obj
            }
        })
        .then((res) => {
            push(`/Achievements`)
        })
    }

        return (
        <Container>
            <Modal
            open={open}
            onClose={handleClose}
            >
                <Box style={{position: 'absolute', padding: '20px', borderRadius: '9px', margin: 'auto', top: '50%',left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', width: '30vw',backgroundColor: 'beige'}}>
                    <Typography variant='h6'> Are you sure you want to delete this achievement? </Typography>
                    <Box style={{marginTop: '2vh'}}>
                        <Button onClick={submitData} variant='contained'>
                            Yes
                        </Button>
                        <Button style={{marginLeft: '1vw'}} variant='contained' onClick={handleClose}>
                            No
                        </Button>
                    </Box>
                </Box>    
            </Modal>

            <Typography variant='h4'> 
                Achievement {obj.id} 
                <Link href={`/Achievements/${obj.id}/edit`} style={{marginLeft: '2vw'}}>
                    <EditOutlinedIcon />
                </Link>
                <Button variant='text' 
                style={{alignItems: 'center'}}
                onClick={handleOpen}
                >
                    <DeleteOutlineOutlinedIcon />
                </Button>
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