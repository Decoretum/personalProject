import {
    Avatar,
    Container,
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
  } from "@mui/material";
  import "@/styles/skills.css";
  import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
  import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
  import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';
  import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
  import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
  import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
  import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
  import { useRouter } from "next/router";
  
  export function Card({ props }: any) {
    console.log(props);
    const router = useRouter()
    return (
      <>
        {props?.data?.map((element: any) => {
          return (
            <Box className="skill" onClick={() => {router.push(`Skills/${element.id}/view`)}} key={element.id} style={{marginTop: '5vh'}}>
              <Grid container style={{display: 'inline-block', textAlign: 'center', wordWrap: 'break-word', margin: 'auto', width: '90%'}} spacing={2}>
                  <Grid item style={{display: 'inline' }}>
                    <Typography variant='h4'> {element.name}</Typography>
                  </Grid>
                  <Grid item style={{display: 'inline'}}>
                  {
                      element.category === 'tech'
                      ? (
                          <DeveloperBoardIcon fontSize='large' color='success' style={{color: 'black'}} />
                      ) : element.category === 'personal' ? (
                        <SettingsAccessibilityOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                      ) : element.category === 'household' ? (
                        <YardOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                      ) : element.category === 'document' ? (
                        <ArticleOutlinedIcon fontSize='large' color='success' style={{color: 'black'}}  />
                      ) : element.category === 'communication' ? (
                        <RecordVoiceOverOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                      ) : element.category === 'gaming' ? (
                        <SportsEsportsOutlinedIcon fontSize='large' color='success' style={{color: 'black'}} />
                      ) : (
                        <Typography> No Icon </Typography>
                      )
                    }   
                  </Grid>
              </Grid>
            </Box>
          );
        })}
      </>
    );
  }