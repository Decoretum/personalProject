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
  import "@/styles/achievements.css";
  import AddCircleIcon from '@mui/icons-material/AddCircle';
  import { Card } from "@/components/skills/card";
  
  export default function Achievements() {
    type format = {
      id: number;
      description: string;
    };
    const skills: UseQueryResult<any, Array<format>> = useQuery({
      queryKey: ["data"],
      queryFn: async () => {
        return axios.get(`/api/Skills`).then((res) => {
          console.log(res.data.results);
          return res.data.results;
        });
      },
    });
  
    if (skills.isFetching) {
      return <h1 style={{ marginLeft: '2vw' }}> Loading Skills Data </h1>;
    }
  
    if (skills.isError) {
      return (
        <h1 style={{ marginLeft: '2vw' }}> Fetching MySQL data for Skills failed </h1>
      );
    }
  
    //If there are no achievements yet
    if (skills.data.length === 0){
      return (
        <Container className='background'>
          <Typography variant='h4'> No Skills added yet </Typography>
          <Link href='/Achievements/create'>
             <Button variant='contained' style={{marginTop: '5vh', padding: '10px'}}>
             <Typography variant='h5'>
              Add
                <AddCircleIcon style={{marginLeft: '1vw', marginTop: '1vh'}} />
              </Typography>
            </Button>
          </Link>
  
          
          
        </Container>
      )
    }
  
    return (
      <Container className="background">
        <Grid container>
          <Grid item>
            <h1> Gael&apos;s Skills </h1>
          </Grid>
          <Grid item style={{marginLeft: '2vw', alignItems: 'center'}}>
            <Link href='/Skills/create'>
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
          <Card props={skills} />
          <br/>
        </Container>
        <br />
      </Container>
    );
  }