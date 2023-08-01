import Image from "next/image";
import styles from "../styles/page.module.css";
import * as mui from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 style={{ fontFamily: "Roboto", marginLeft: '5vw' }}>
        Gael Estrera's NextJS Portfolio Page
      </h1>

      <mui.Container style={{ marginTop: "6vh", fontFamily: "Roboto" }}>
        <h2> Links </h2>

        <mui.List style={{ width: "20vw" }}>
          <Link href={"/Intro"}>
            <mui.ListItem>Introduction</mui.ListItem>
            <mui.Divider />
          </Link>
        </mui.List>
      </mui.Container>
    </>
  );
}
