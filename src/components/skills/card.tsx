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
  import Link from "next/link";
  
  export function Card({ props }: any) {
    console.log(props);
    return (
      <>
        {props?.data?.map((element: any) => {
          return (
            <Box key={element.id} className="skill">
  
              <Grid container style={{marginLeft: '0.7vw'}}>
                <Link href={`Skills/${element.id}/view`}>
                  <Grid item>
                    <DeveloperBoardIcon style={{clear: 'none'}} />
                    <Typography variant='h4'> {element.name} </Typography>
                  </Grid>
                </Link>
              </Grid>
            </Box>
          );
        })}
      </>
    );
  }