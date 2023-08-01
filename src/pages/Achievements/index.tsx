import {
  Avatar,
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
    return <h1 style={{ fontFamily: "Roboto" }}> Fetching data from MySQL </h1>;
  }

  if (achievements.isError) {
    return (
      <h1 style={{ fontFamily: "Roboto" }}> Fetching MySQL data failed </h1>
    );
  }

  return (
    <Container className="background">
      <Grid container style={{ fontFamily: "Roboto" }}>
        <Grid item>
          <h1 style={{ fontSize: "15px" }}> Gael's Achievements </h1>
        </Grid>
        <Grid item style={{ marginLeft: "68vw" }}>
          <Link href={"/Intro"}>
            <h1 style={{ fontSize: "15px" }}> Back to Home </h1>
          </Link>
        </Grid>
      </Grid>

      <Container
        style={{
          marginTop: "5vh",
          width: "80%",
          borderRadius: "9px",
          boxShadow: "9px 9px",
          backgroundColor: "ThreeDDarkShadow",
          padding: "10px",
        }}
      >
        <Card props={achievements} />
      </Container>
      <br />
    </Container>
  );
}
