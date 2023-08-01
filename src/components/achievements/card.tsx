import {
  Avatar,
  Container,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "@/styles/achievements.css";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import Link from "next/link";

export function Card({ props }: any) {
  return (
    <>
      {props?.data?.map((element: any) => {
        return (
          <Box key={element.id} className="achievement">
            <Grid container >
              <Link href={`Achievements/${element.id}/view`}>
                <Grid item>
                  <DeveloperBoardIcon style={{clear: 'none'}} />
                  <h4 style={{clear: 'none'}}> {element.title} </h4>
                </Grid>
              </Link>
            </Grid>
            
            <p style={{ marginTop: "2vh" }}>
              <i>Description</i>
            </p>
            <p style={{ marginTop: "0.78vh" }}>{element.description}</p>
          </Box>
        );
      })}
    </>
  );
}
