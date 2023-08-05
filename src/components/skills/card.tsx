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
  import Link from "next/link";
  
  export function Card({ props }: any) {
    console.log(props);
    return (
      <>
        {props?.data?.map((element: any) => {
          return (
            <Box key={element.id} className="skill" style={{marginTop: '5vh'}}>
              <Grid container style={{margin: 'auto', width: '50%' }} spacing={2}>
                <Link href={`Skills/${element.id}/view`} style={{display: 'inline-flex'}}>
                  <Grid item style={{display: 'inline'}}>
                    <Typography variant='h4'> {element.name} </Typography>
                  </Grid>
                  <Grid item style={{display: 'inline', marginLeft: '2vw'}}>
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
                </Link>
              </Grid>
            </Box>
          );
        })}
      </>
    );
  }