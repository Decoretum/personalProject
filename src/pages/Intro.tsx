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
import Link from "next/link";

export default function Intro() {
  return (
    <Container
      style={{ backgroundColor: "linen", padding: "15px", borderRadius: "9px", maxWidth: '100vw' }}
    >
      <Container>
        <h1 style={{ fontFamily: "Roboto" }}> Introduction Page </h1>
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          style={{ display: "inline-flex", marginTop: "6vh " }}
        >
          GE
        </Avatar>

        <span style={{ marginLeft: "1vw", fontFamily: "Roboto" }}>
          Gael Estrera's Fullstack Application
        </span>
      </Container>

      <Grid container>
        <Grid item>
          <List style={{ width: "30vw" }}>
            <Link href="/About">
              <ListItem>
                <ListItemText primary="About" />
              </ListItem>
              <Divider />
            </Link>

            <ListItem>
              <Link href="/Achievements">
                <ListItemText primary="Achievements" />
              </Link>
            </ListItem>

            <Divider />
            
            <ListItem>
              <ListItemText primary="Skills" />
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
              Gael specializes in Software Development, specifically back-end.
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
