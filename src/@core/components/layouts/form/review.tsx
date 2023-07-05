/* eslint-disable @next/next/no-img-element */
// ** Components import
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Grid,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";

// ** Hooks import
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

// ** MUI Icons import
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// ** APIs import
import { ReviewAPI } from "@/@core/api/reviewApi";

// ** Other import
import axios from "axios";
import { CURRENT_USER_ID } from "@/@core/utils/cafes";
import * as Yup from 'yup';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    paddingBottom: 20,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IProps {
  handleClose: () => void;
  open: boolean;
  name: string;
  images: string[];
  address: string;
  coffee_shop_ID: number | undefined;
}

interface DialogTitleProps {
  id: string;
  onClose: () => void;
  children?: React.ReactNode;
}

interface FormValues {
  star: number;
  review: string;
  coffee_shop_ID: number | undefined;
  user_ID: number;
  images: string[];
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MakeReview(props: IProps) {
  const initialValues: FormValues = {
    coffee_shop_ID: props.coffee_shop_ID,
    star: 0,
    review: "",
    user_ID: CURRENT_USER_ID,
    images: [],
  };

  const validationSchema = Yup.object().shape({
    inputValue: Yup.number()
      .min(1, 'Value must be at least 1')
      .max(5, 'Value must be at most 5')
      .required('Value is required'),
  });

  const [formValue, setFormValue] = useState<FormValues>(initialValues);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [uploadFiles, setUploadFiles] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    if (props.coffee_shop_ID !== undefined) {
      const tempFormValue = {
        ...formValue,
        coffee_shop_ID: parseInt(props.coffee_shop_ID as unknown as string, 10),
      };
      setFormValue(tempFormValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleOnchangeRatingStar = (event: any, newValue: number) => {
    const tempStar = { ...formValue, star: newValue };
    setFormValue(tempStar);
  };

  const handleOnchangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempReview = { ...formValue, review: value };
    setFormValue(tempReview);
  };

  const handleSubmit = async () => {
    const reviewImages: string[] = [];
    for (const file of uploadFiles) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post(
          "https://itss-1-be.fly.dev/api/v2/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        reviewImages.push(res.data.url);
      } catch (error) {
        // Handle the error
      }
    }
    const params = { ...formValue, images: reviewImages };
    props.handleClose();
    await ReviewAPI.postOne(params);
    router.reload();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray = [...uploadFiles];
    if (files) {
      const previewArray = Array.from(files).map((file) => {
        filesArray.push(file);
        return URL.createObjectURL(file);
      });
      setPreviewImages(previewArray);
      setUploadFiles(filesArray);
      // Handle the image field change here
      console.log(files);
    }
  };

  return (
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleClose}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          レビューを書く
        </Typography>
      </BootstrapDialogTitle>
      <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={validationSchema}>
        <Form>
          <DialogContent dividers>
            <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
              カフェ
            </Typography>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "calc(100%)",
                position: "relative",
                maxHeight: "270px",
                border: "1px solid black",
                boxShadow: "none",
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
              <CardContent
                sx={{
                  paddingLeft: 0,
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 700, fontSize: 24 }}
                >
                  {props.name}
                </Typography>

                <Box display="flex" alignItems="flex-start" mt={2}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontSize: 16 }}
                  >
                    {props.address}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Box sx={{ my: 0.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                  エアコンの評価点
                </Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Field
                    as={Rating}
                    name="star"
                    label="Star"
                    type="number"
                    inputprops={{ min: 0, max: 5 }}
                    id="rating-star"
                    precision={1}
                    required
                    onChange={handleOnchangeRatingStar}
                    value={formValue.star}
                  />
                  <Typography ml={2} fontSize={18}>
                    {formValue.star}
                  </Typography>
                </Box>
                <ErrorMessage name="star" component="div" />
              </Box>

              <Box sx={{ my: 0.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                  コメント
                </Typography>
                <Field
                  as={TextField}
                  name="review"
                  multiline
                  rows={4}
                  required
                  onChange={handleOnchangeReview}
                  value={formValue.review}
                  sx={{ width: "100%", my: 1 }}
                  placeholder="なぜその評価を思うのですか。"
                />
                <ErrorMessage name="review" component="div" />
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, my: 1, width: "95%" }}
              >
                写真
              </Typography>
              <Grid container spacing={2} width={"calc(100%)"}>
                {previewImages.map((previewImage) => (
                  <Grid item key={previewImage} sm={4} md={4} lg={4} xl={4}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        border: "1px solid black",
                        borderRadius: "10px",
                        aspectRatio: "1 / 1",
                      }}
                    />
                  </Grid>
                ))}
                <Grid item sm={4} md={4} lg={4} xl={4}>
                  <Box
                    sx={{
                      border: "1px solid black",
                      padding: "0px",
                      aspectRatio: "1 / 1",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                  >
                    <label
                      htmlFor="image-upload"
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AddOutlinedIcon sx={{ fontSize: 60 }} />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              autoFocus
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddOutlinedIcon />}
              sx={{ width: "20%" }}
            >
              投稿
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </BootstrapDialog>
  );
}
