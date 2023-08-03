import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
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
    return <h1 style={{ marginLeft: '2vw' }}> Fetching data from MySQL </h1>;
  }

  if (achievements.isError) {
    return (
      <h1 style={{ marginLeft: '2vw' }}> Fetching MySQL data failed </h1>
    );
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
          width: "50%",
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
