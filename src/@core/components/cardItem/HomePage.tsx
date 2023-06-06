// ** MUI Component import
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";

// ** Interface import
import { ICardItemHomePage } from "@/interfaces/cardItem";

const homePageBoxStyle = {
  border: "1px solid #556cd6",
  borderRadius: "5px",
};

export const CardItemHomePage = (props: ICardItemHomePage) => {
  return (
    <Box width="400px" sx={homePageBoxStyle}>
      <Card>
        <CardMedia
          component="img"
          image={
            props.image ? props.image : "https://i.ibb.co/6WXYg60/cafe.jpg"
          }
          height="250px"
          width="auto"
          alt="cafe image"
          sx={{ padding: "10px" }}
        />
        <CardContent sx={{ paddingTop: "0" }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ fontSize: 16, marginBottom: "3px" }}>
            {props.address}
          </Typography>
          <Box display="flex" alignItems="center">
            <Rating
              name="simple-controlled"
              value={props.star}
              precision={0.1}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
            <Typography component="span" sx={{ marginLeft: 1 }}>
              {props.star}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
