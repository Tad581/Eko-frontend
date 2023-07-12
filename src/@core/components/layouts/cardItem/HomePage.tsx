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
import { ICafeInfo } from "@/interfaces";

// ** Hooks import
import { useRouter } from "next/router";

const homePageBoxStyle = {
  border: "1px solid #556cd6",
  borderRadius: "5px",
  width: {
    xs: "90vw",
    sm: "90vw",
    md: "45vw",
    lg: "30vw",
    xl: "22vw",
  },
  height: "calc(100%)",
};

export const CardItemHomePage = (props: ICafeInfo) => {
  const router = useRouter();
  return (
    <Box
      width="400px"
      sx={homePageBoxStyle}
      onClick={() => {
        router.push({
          pathname: "/search-results/[id]",
          query: { id: props.id },
        });
      }}
    >
      <Card sx={{ height: "calc(100%)" }}>
        <CardMedia
          component="img"
          image={
            props.images ? props.images[0] : "https://i.ibb.co/6WXYg60/cafe.jpg"
          }
          height="250px"
          width="auto"
          alt="cafe image"
          sx={{ padding: "10px" }}
        />
        <CardContent sx={{ paddingTop: "0" }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontSize: 16, marginBottom: "3px" }}
          >
            {props.address}
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: 14, marginRight: 1, fontWeight: "bold" }}
          >
            エアコンへの評価
          </Typography>
          <Box display={"flex"} mt={1} justifyContent={"space-between"}>
            <Box>
              <Typography
                component="span"
                sx={{ fontSize: 14, marginRight: 1 }}
              >
                アドミンから
              </Typography>
              <Box display="flex" alignItems="center" ml={-0.3}>
                <Rating
                  name="simple-controlled"
                  value={props.status}
                  precision={0.1}
                  readOnly
                />
                <Typography component="span" sx={{ marginLeft: 1 }}>
                  {props.status}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                component="span"
                sx={{ fontSize: 14, marginRight: 1 }}
              >
                ユーザーから
              </Typography>
              <Box display="flex" alignItems="center" ml={-0.3}>
                <Rating
                  name="simple-controlled"
                  value={props.review.star}
                  precision={0.1}
                  readOnly
                />
                <Typography component="span" sx={{ marginLeft: 1 }}>
                  {props.review.star.toFixed(1)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
