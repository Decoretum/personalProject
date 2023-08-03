import Image from "next/image";
import styles from "../styles/page.module.css";
import * as mui from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <mui.Container className={styles.bg}>
        <mui.Typography variant='h4' style={{ marginLeft: '1vw' }}>
          Gael Estrera&apos;s NextJS Portfolio Page
        </mui.Typography>

        <mui.Container style={{ marginTop: "6vh", fontFamily: "Roboto" }}>
          <h2> Links </h2>

          <mui.List style={{ width: "20vw" }}>
            <Link href={"/Intro"}>
              <mui.ListItem>
                <mui.Button variant='contained' className={styles.b1}>  
                  Main
                </mui.Button>
              </mui.ListItem>
              <mui.Divider />
            </Link>
          </mui.List>
        </mui.Container>
      </mui.Container>
      <br/>
    </>
  );
}
