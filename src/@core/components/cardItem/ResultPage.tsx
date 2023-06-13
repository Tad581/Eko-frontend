// ** MUI Components import
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";

// ** MUI Icons import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

// ** Interfaces import
import { ICardItem } from "@/interfaces";

const resultPageBoxStyle = {
  border: "1px solid #000",
  borderRadius: "5px",
  height: "100%",
  margin: "10px",
};

export const CardItemResultPage = (props: ICardItem) => {
  return (
    <Box width="95%" sx={resultPageBoxStyle}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "200px",
          position: "relative",
        }}
      >
        <Box width="280px">
          <CardMedia
            component="img"
            image={
              props.image ? props.image : "https://i.ibb.co/6WXYg60/cafe.jpg"
            }
            height="100%"
            alt="cafe image"
            sx={{ padding: "20px", borderRadius: "30px" }}
          />
        </Box>
        <CardContent sx={{ paddingLeft: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 700, fontSize: 24 }}
          >
            {props.name}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ fontSize: 16 }}>
            カフェの食わし場所
          </Typography>
          <Box display="flex" alignItems="center">
            <Rating
              name="simple-controlled"
              value={props.star}
              precision={0.1}
              readOnly
            />
            <Typography component="span" sx={{ marginLeft: 1 }}>
              {props.star}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <PlaceOutlinedIcon />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              ml={1}
            >
              {props.address}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AccessTimeOutlinedIcon />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              ml={1}
            >
              {props.business_hours}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              mx={1}
            >
              -
            </Typography>
            <Typography
              sx={{ fontWeight: 600, fontSize: 16 }}
              variant="subtitle1"
              component="div"
            >
              オープン中
            </Typography>
          </Box>
        </CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            border: "1px solid #000",
            padding: "16px",
            borderRadius: "8px",
            width: "50px",
            height: "50px",
            marginTop: "16px",
            position: "absolute",
            right: "20px",
          }}
        >
          <BookmarkBorderOutlinedIcon />
        </Box>
      </Card>
    </Box>
  );
};
