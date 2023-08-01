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

export function Card({ props }: any) {
  return (
    <>
      {props?.data?.map((element: any) => {
        return (
          <Box key={element.id} className="achievement">
            <h4> {element.title} </h4>
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
