// ** MUI Components import
import { Box, Typography, Avatar, Rating, Button, Select, FormControl, MenuItem } from "@mui/material";

// ** MUI Icons import
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// ** Hooks import
import { useState, useEffect } from "react";

// ** Interfaces import
import { IReview } from "@/interfaces";

// ** Other import
import { sortOptionsReview } from "@/@core/utils/cafes";

interface IProps {
  reviews: IReview[];
}

export default function Reviews(props: IProps) {
  return (
    <Box mt={3}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          レビュー
        </Typography>
        <Box display={"flex"}>
          <Box
            justifyContent={"flex-start"}
            alignItems={"center"}
            display={"flex"}
            mr={3}
          >
            <Typography mr={3}>並べ替え</Typography>
            <FormControl>
              <Select
                labelId="sort-mode"
                id="sort-mode"
                // value={sortMode as unknown as string}
                // onChange={handleChangeSortMode}
                sx={{ width: "auto", height: "40px" }}
                defaultValue={sortOptionsReview[0].value as unknown as string}
              >
                {sortOptionsReview.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
            startIcon={<AddOutlinedIcon />}
          >
            レビューを書く
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        {props.reviews.map((review: IReview) => (
          <Box key={review.id} display={"flex"}>
            <Avatar
              alt={review.username}
              src={review.avatar}
              sx={{ border: "1px solid" }}
            />
            <Box
              sx={{
                border: "1px solid black",
                borderRadius: "5px",
                width: "100%",
                marginLeft: 3,
                padding: "15px 20px",
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                {review.username}
              </Typography>
              <Box display={"flex"}>
                <Typography sx={{ fontSize: 14, marginRight: 1 }}>
                  エアコンへの評価 :
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={review.star}
                  precision={0.1}
                  readOnly
                />
                <Typography component="span" sx={{ marginLeft: 1 }}>
                  {review.star}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 16, fontWeight: 400, marginTop: 1 }}>
                {review.review}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
