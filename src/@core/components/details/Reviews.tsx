// ** Components import
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Button,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Grid,
  CardMedia,
} from "@mui/material";
import MakeReview from "../layouts/form/review";
// ** MUI Icons import
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// ** Hooks import
import { useState, useEffect } from "react";

// ** Interfaces import
import { IReview, ESortModeReview, EUserNationality } from "@/interfaces";

// ** Other import
import {
  sortOptionsReview,
  apiSortOptionsReview,
  handleSortOptionReview,
  nationalityFilterOption,
} from "@/@core/utils/cafes";

// ** APIs import
import { ReviewAPI } from "@/@core/api/reviewApi";
interface IProps {
  id: number | undefined;
  name: string;
  images: string[];
  address: string;
}

export default function Reviews(props: IProps) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [open, setOpen] = useState(false);

  const [sortMode, setSortMode] = useState<ESortModeReview>(
    ESortModeReview.Newest
  );

  const [filterMode, setFilterMode] = useState<EUserNationality>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSortMode = (event: SelectChangeEvent) => {
    setSortMode(event.target.value as unknown as ESortModeReview);
  };

  const handleChangeFilterMode = (event: SelectChangeEvent) => {
    setFilterMode(event.target.value as unknown as EUserNationality);
  };

  useEffect(() => {
    if (props.id !== undefined) {
      let paramsReview = {
        coffee_shop_ID: props.id,
        orderType: apiSortOptionsReview[ESortModeReview.Newest].orderType,
        orderBy: apiSortOptionsReview[ESortModeReview.Newest].orderBy,
        user_nationality_whitelist: filterMode,
      };

      paramsReview.orderBy = handleSortOptionReview(sortMode).orderBy;
      paramsReview.orderType = handleSortOptionReview(sortMode).orderType;

      if (filterMode === EUserNationality.All)
        delete paramsReview.user_nationality_whitelist;

      (async () => {
        const getAllReview = await ReviewAPI.getAll(paramsReview);
        setReviews(getAllReview.data);
      })();
    }
  }, [props.id, sortMode, filterMode]);

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
            <Typography mr={3}>評価した人の国籍</Typography>
            <FormControl>
              <Select
                labelId="sort-mode"
                id="sort-mode"
                value={filterMode as unknown as string}
                onChange={handleChangeFilterMode}
                sx={{ width: "auto", height: "40px" }}
                defaultValue={nationalityFilterOption[0] as unknown as string}
              >
                {nationalityFilterOption.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
                value={sortMode as unknown as string}
                onChange={handleChangeSortMode}
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
            onClick={handleClickOpen}
          >
            レビューを書く
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        {reviews.map((review: IReview) => (
          <Box key={review.id} display={"flex"} mb={1}>
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
                {review.username} {review.nationality === "日本" ? '🇯🇵' : '🇻🇳'}
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
              <Grid container spacing={2} mt={2}>
                {review.images.map((imageUrl: string) => (
                  <Grid item sm={3} md={3} lg={3} xl={3} key={imageUrl}>
                    <CardMedia
                      key={imageUrl}
                      sx={{
                        aspectRatio: "1 / 1",
                        width: "100%",
                        borderRadius: "10px",
                        border: "1px solid black",
                      }}
                      image={
                        imageUrl
                          ? imageUrl
                          : "https://i.ibb.co/6WXYg60/cafe.jpg"
                      }
                      title="green iguana"
                    ></CardMedia>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
      <MakeReview
        handleClose={handleClose}
        coffee_shop_ID={props.id}
        open={open}
        name={props.name}
        address={props.address}
        images={props.images}
      ></MakeReview>
    </Box>
  );
}
