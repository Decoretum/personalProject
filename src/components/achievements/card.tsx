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
import "@/styles/achievements.css";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { EmojiEventsSharp } from "@mui/icons-material";
import Link from "next/link";

export function Card({ props }: any) {
  console.log(props);
  return (
    <>
      {props?.data?.map((element: any) => {
        return (
          <Box key={element.id} className="achievement">

            <Grid container style={{marginLeft: '0.7vw'}}>
              <Link href={`Achievements/${element.id}/view`}>
                <Grid item>
                  <EmojiEventsSharp style={{clear: 'none'}} />
                  <Typography variant='h4'> {element.title} </Typography>
                </Grid>
              </Link>
            </Grid>
            
            {/* <Box className='description'>
              <p style={{ marginTop: "0.78vh", lineHeight: '3' }}>{element.description}</p>
            </Box> */}
          </Box>
        );
      })}
    </>
  );
}
