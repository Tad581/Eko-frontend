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
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";

// ** Icons import
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ImageForm from "./ImageForm";

interface FormValues {
  star: number;
  review: string;
  coffee_shop_ID: number | undefined;
  user_ID: number;
  images: string[];
}

export default function DataForm() {
  const initialValues: FormValues = {
    coffee_shop_ID: 1,
    star: 0,
    review: "",
    user_ID: 4,
    images: [],
  };

  return (
    <Box sx={{paddingX: "90px", paddingY: "50px", display: "flex"}}>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <Form style={{display: "flex", flexDirection: "column", width: "60%"}}>
          <DialogContent dividers sx={{borderRadius: "10px", border: "1px solid black"}}>
            <Typography sx={{ fontSize: "32px", fontWeight: 700, my: 1 }}>
              喫茶店の追加
            </Typography>
            <Box sx={{ my: 0.5 }} display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                名前
              </Typography>
              <Field
                as={TextField}
                name="review"
                rows={4}
                required
                // onChange={handleOnchangeReview}
                // value={formValue.review}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="review" component="div" />
            </Box>
            <Box sx={{ my: 0.5 }} display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                場所
              </Typography>
              <Field
                as={TextField}
                name="review"
                rows={4}
                required
                // onChange={handleOnchangeReview}
                // value={formValue.review}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="review" component="div" />
            </Box>
            <Box sx={{ my: 0.5 }} display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                電話番号
              </Typography>
              <Field
                as={TextField}
                name="review"
                rows={4}
                required
                // onChange={handleOnchangeReview}
                // value={formValue.review}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="review" component="div" />
            </Box>
            <Box sx={{ my: 0.5 }} display={"flex"} justifyContent={"space-between"}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                詳細情報
              </Typography>
              <Field
                as={TextField}
                name="review"
                multiline
                rows={4}
                required
                // onChange={handleOnchangeReview}
                // value={formValue.review}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="review" component="div" />
            </Box>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center", padding: 0, my: 2 }}>
            <Button
              autoFocus
              // onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddOutlinedIcon />}
              sx={{ width: "100%" }}
            >
              喫茶店を追加
            </Button>
          </DialogActions>
        </Form>
      </Formik>
      <ImageForm/>
    </Box>
  );
}
