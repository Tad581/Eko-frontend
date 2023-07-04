// ** MUI Components import
import { Box, Button, Rating, Typography } from "@mui/material";

// ** Hooks import
import { useState, useEffect } from "react";

// ** MUI Icons import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// ** Interfaces import
import { IBookmarkInput, ICafeInfo } from "@/interfaces";

// ** API import
import { BookmarkAPI } from "@/@core/api/bookmarkApi";

// ** Other import
import { CURRENT_USER_ID } from "@/@core/utils/cafes";

export default function BasicInfo(props: ICafeInfo) {
  const [bookmarked, setBookmarked] = useState<number>(props.bookmarked);

  const handleBookmark = async (bookmarkInput: IBookmarkInput) => {
    if (bookmarked === 0) {
      setBookmarked(1);
      await BookmarkAPI.postOne(bookmarkInput);
    } else {
      setBookmarked(0);
      await BookmarkAPI.deleteOne(bookmarkInput);
    }
  };

  useEffect(() => {
    setBookmarked(props.bookmarked);
  }, [props]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          {props.name}
        </Typography>
        <Button
          variant="outlined"
          size="medium"
          sx={{ minWidth: "100px", fontWeight: 700 }}
          startIcon={
            bookmarked === 0 ? <BookmarkBorderOutlinedIcon /> : <BookmarkIcon />
          }
          onClick={() =>
            handleBookmark({
              user_ID: CURRENT_USER_ID,
              coffee_shop_ID: props.id,
            })
          }
        >
          {bookmarked === 0 ? "ブークマーク" : "ブークマークを解除"}
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="flext-start"
        flexDirection={"column"}
        my={2}
      >
        <Typography sx={{ fontSize: 14, marginRight: 1, fontWeight: "bold" }}>
          エアコンへの評価
        </Typography>
        <Box display={"flex"} mt={1}>
          <Box>
            <Typography component="span" sx={{ fontSize: 14, marginRight: 1 }}>
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
            <Typography component="span" sx={{ fontSize: 14, marginRight: 1 }}>
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
      <Box display="flex" alignItems="center" mt={2}>
        <AccessTimeOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16 }}
          ml={1}
        >
          {props.opening_at} - {props.closing_at}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <LocalPhoneOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16 }}
          ml={1}
        >
          {props.phone_number}
        </Typography>
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
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontSize: 16 }}
        mt={2}
      >
        {props.description}
      </Typography>
    </Box>
  );
}
