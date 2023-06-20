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
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";

// ** Hooks import
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

// ** MUI Icons import
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// ** APIs import
import { ReviewAPI } from "@/@core/api/reviewApi";

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
    user_ID: 4,
    images: [],
  };

  const [formValue, setFormValue] = useState<FormValues>(initialValues);

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
    console.log(formValue);
    const params = formValue;
    const postOneReview = await ReviewAPI.postOne(params);
    console.log(postOneReview);
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
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                    precision={0.1}
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
                  エアコンの評価点
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
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              autoFocus
              onClick={props.handleClose}
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
