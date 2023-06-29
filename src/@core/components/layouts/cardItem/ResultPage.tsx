// ** Components import
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import Link from "next/link";

// ** MUI Icons import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

// ** Interfaces import
import { ICafeInfo } from "@/interfaces";

// ** Hooks import
import { useRouter } from "next/router";

const resultPageBoxStyle = {
  border: "1px solid #000",
  borderRadius: "5px",
  margin: "10px",
};

export const CardItemResultPage = (props: ICafeInfo) => {
  // const router = useRouter();

  return (
    <Box
      width="95%"
      sx={resultPageBoxStyle}
      // onClick={() => {
      //   router.push({
      //     pathname: "/search-results/[id]",
      //     query: { id: props.id },
      //   });
      // }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100%)",
          position: "relative",
          maxHeight: "270px",
        }}
      >
        <Box width="40%">
          <CardMedia
            component="img"
            image={
              props.images
                ? props.images[0]
                : "https://i.ibb.co/6WXYg60/cafe.jpg"
            }
            height="100%"
            alt="cafe image"
            sx={{ padding: "20px", borderRadius: "30px" }}
          />
        </Box>
        <CardContent sx={{ paddingLeft: 0, width: "60%" }}>
          <Link
            href={`/search-results/${props.id}`}
            style={{ fontWeight: 700, fontSize: 24, marginBottom: 2 }}
          >
            {props.name}
          </Link>
          <Typography sx={{ fontSize: 14, marginRight: 1, fontWeight: "bold" }}>
            エアコンへの評価
          </Typography>
          <Box display={"flex"} mt={1}>
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
            <Box ml={6}>
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

          <Box display="flex" alignItems="center" mt={2}>
            <GroupsOutlinedIcon sx={{ mr: 2 }} />
            {"今店での人数: "}
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16, fontWeight: "bold" }}
              ml={1}
            >
              {props.current_crowded === 0
                ? "少ない"
                : props.current_crowded === 1
                ? "普通"
                : "多い"}
            </Typography>
          </Box>
          <Box display="flex" alignItems="flex-start">
            <PlaceOutlinedIcon sx={{ mt: 0.5 }} />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              ml={1}
            >
              {props.address}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <AccessTimeOutlinedIcon />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 16 }}
              ml={1}
            >
              {props.opening_at} - {props.closing_at}
            </Typography>
            {/* <Typography
              sx={{ fontWeight: 600, fontSize: 16 }}
              variant="subtitle1"
              component="div"
            >
              オープン中
            </Typography> */}
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
