import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/achievements/card";
import "@/styles/achievements.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Achievements() {
  type format = {
    id: number;
    description: string;
  };
  const achievements: UseQueryResult<any, Array<format>> = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return axios.get(`/api/achievements`).then((res) => {
        console.log(res.data.results);
        return res.data.results;
      });
    },
  });

  if (achievements.isFetching) {
    return <h1 style={{ marginLeft: '2vw' }}> Loading Achievements Data </h1>;
  }

  if (achievements.isError) {
    return (
      <h1 style={{ marginLeft: '2vw' }}> Fetching MySQL data for Achievements failed</h1>
    );
  }

  //If there are no achievements yet
  if (achievements.data.length === 0){
    return (
      <Container className='background'>
        <Typography variant='h4'> No achievements yet </Typography>
        <Link href='/Achievements/create'>
           <Button variant='contained' style={{marginTop: '5vh', padding: '10px', display:'inline'}}>
           <Grid container style={{display: 'inline-flex'}}>
            <Grid item>
              <Typography variant='body1' style={{marginTop: '1.5vh'}}>
                {`A` + `Add`.slice(1).toLowerCase()}
              </Typography>
            </Grid>
            <Grid item>
              <AddCircleIcon style={{marginLeft: '1vw', marginTop: '1.5vh', display:'inline'}} />
            </Grid>
          </Grid>
          </Button>
        </Link>

        
        
      </Container>
    )
  }

  return (
    <Container className="background">
      <Grid container>
        <Grid item>
          <h1> Gael&apos;s Achievements </h1>
        </Grid>
        <Grid item style={{marginLeft: '2vw', alignItems: 'center'}}>
          <Link href='/Achievements/create'>
            <AddCircleIcon style={{marginTop: '1vh'}} />
          </Link>
        </Grid>
        <Grid item style={{ marginLeft: "55vw" }}>
          <Link href={"/Intro"}>
            <Button variant='contained' color="success"> Back </Button>
          </Link>
        </Grid>
      </Grid>

      <Container
        style={{
          marginTop: "5vh",
          width: "100%",
          borderRadius: "9px",
          boxShadow: "0 0 10px #ccc",
          backgroundColor: 'beige',
          padding: "10px",
        }}
      >
        <Card props={achievements} />
        <br/>
      </Container>
      <br />
    </Container>
  );
}
