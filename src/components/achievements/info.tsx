import { Container, Typography, Box, Grid, Divider, List, ListItem, Modal, Button } from "@mui/material";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import '@/styles/achievements.css'

type skillArch = {
    name : string,
    category : string
}

export default function Info({props} : any){
    const obj = props.achievement;
    console.log(obj)
    const skills = props.skills
    const skillMap = props.skills
    console.log(skills)
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
                <List style={{lineHeight: '3', textAlign: 'justify'}}>
                    <ListItem> {obj.description} </ListItem> 
                    <ListItem> 
                        <Typography variant='h6'> Skills </Typography>
                        <List style={{display: 'inline-flex'}}>
                        
                        {
                            skills?.map((skill : skillArch) => {
                                
                                return(
                                    <ListItem key={skill.name} style={{marginTop: '1vh'}}>
                                        <Grid container className='info'>
                                            <Grid item style={{ display: 'inline', margin: 'auto'}}>
                                                <Typography variant='body1' key={skill.name}> 
                                                    {skill.name}         
                                                </Typography>
                                            </Grid>
                                            <Grid item style={{ display: 'inline', margin: 'auto', marginTop: '1.7vh'}}>
                                            {
                                                skill.category === 'tech'
                                                ? (
                                                    <DeveloperBoardIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : skill.category === 'personal' ? (
                                                    <SettingsAccessibilityOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : skill.category === 'household' ? (
                                                    <YardOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : skill.category === 'document' ? (
                                                    <ArticleOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : skill.category === 'communication' ? (
                                                    <RecordVoiceOverOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : skill.category === 'gaming' ? (
                                                    <SportsEsportsOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                                                ) : (
                                                    <Typography> No Icon </Typography>
                                                )
                                            }
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    )
                            })
                        }
                        </List>
                    </ListItem>
                    {obj.Duration === null || obj.Duration === '' ? (
                        <ListItem style={{marginTop: '2vh'}}> No indicated duration </ListItem>
                    ) : (
                        <ListItem style={{marginTop: '2vh'}}> 
                        <Typography variant='h6'> Duration: </Typography>
                         <Typography style={{marginLeft: '1vw'}}> {obj.Duration} </Typography>
                        </ListItem>
                    )

                    }
                    
                </List>

                

            </Box>
        </Container>
        )
    
}