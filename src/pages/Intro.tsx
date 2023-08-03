import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import CakeIcon from '@mui/icons-material/Cake';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SchoolIcon from '@mui/icons-material/School';
import Link from "next/link";

export default function Intro() {
  return (
    <Container
      style={{ backgroundColor: "linen", padding: "15px", borderRadius: "9px", maxWidth: '100vw' }}
    >
      <Container>
        <h1 style={{ fontFamily: "Roboto" }}> Overview </h1>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          style={{ display: "inline-flex", marginTop: "6vh " }}
        >
          GE
        </Avatar>

        <span style={{ marginLeft: "1vw", fontFamily: "Roboto" }}>
          Gael Estrera&apos;s Fullstack Application
        </span>
      </Container>

      <Grid container style={{marginLeft: '3vw', marginTop: '2vh'}}>
        <Grid item>
          <List style={{ width: "30vw" }}>
              <ListItem>
                <CakeIcon color='primary' />
                <ListItemText style={{marginLeft: '2vw'}} primary="Date of Birth: 02/07/2003" />
              </ListItem>
              <Divider />

            <ListItem>
                <ViewInArIcon color='primary' />
                <ListItemText style={{marginLeft: '2vw'}} primary="Software Developer & Speedcuber" />
            </ListItem>

            <Divider />
            
            <ListItem>
              <SchoolIcon color='primary' />
              <ListItemText style={{marginLeft: '2vw'}} primary="Ateneo de Manila University" />
            </ListItem>
            <Divider />
          </List>
        </Grid>

        <Grid item style={{ fontFamily: "Roboto", marginLeft: '10vw' }}>
          <List>
            <Divider> Who is Gael? </Divider>
            <ListItem>
              He is a programmer, gamer, and a music enthusiast.
            </ListItem>
            <ListItem>
              He loves programming, playing sandbox, combat, and RPG video
              games.
            </ListItem>
            <Divider style={{ marginTop: "4vh" }} light>
              Where does Gael Specialize in?{" "}
            </Divider>
            <ListItem>
              Gael specializes in Software Development, specifically back-end
              development.
            </ListItem>
            <ListItem>
              Gael is also enthusiastic in doing Data Structures and Algorithms.
            </ListItem>
            <ListItem>
              He aspires to create powerful Enterprise-level software through
              Java and Javascript.
            </ListItem>
          </List>
        </Grid>

      </Grid>

    </Container>
  );
}
