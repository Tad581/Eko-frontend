// ** MUI Component import
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";

// ** MUI Icon import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const resultPageBoxStyle = {
  border: "1px solid #556cd6",
  borderRadius: "5px",
  height: "100%",
};

export const CardItemResultPage = () => {
  return (
    <Box width="70%" sx={resultPageBoxStyle}>
      <Card sx={{ display: "flex", flexDirection: "row", height: "200px", position: "relative",}}>
        <Box width="35%">
          <CardMedia
            component="img"
            // image={
            //   props.image ? props.image : "https://i.ibb.co/6WXYg60/cafe.jpg"
            // }
            image="https://i.ibb.co/6WXYg60/cafe.jpg"
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
            {/* {props.name} */}
            カフェの名前
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ fontSize: 16 }}>
            {/* {props.address} */}
            カフェの食わし場所
          </Typography>
          <Box display="flex" alignItems="center">
            <Rating
              name="simple-controlled"
              value={3}
              precision={0.5}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
            <Typography component="span" sx={{ marginLeft: 1 }}>
              3.0
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
              2 Đinh Liệt, Hoàn Kiếm
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
              08:00 - 23:00
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              mx={1}
            >
              --
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
            border: "1px solid #556cd6",
            padding: "16px",
            borderRadius: "8px",
            width: "50px",
            height: "50px",
            marginTop: "16px",
            position: "absolute",
            right: "20px"
          }}
        >
          <BookmarkBorderOutlinedIcon color="primary" />
        </Box>
      </Card>
    </Box>
  );
};
