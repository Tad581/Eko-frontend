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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ImageForm from "./ImageForm";

// ** Hook import
import { useState } from "react";
import { useRouter } from "next/router";

// ** Other import
import axios from "axios";
import { CROWDED_TIME, CURRENT_USER_ID, DEVICES } from "@/@core/utils/cafes";
import { CafeAPI } from "@/@core/api/cafeApi";

interface FormValues {
  name: string;
  opening_at: string;
  closing_at: string;
  status?: number;
  devices?: { name: string; quantity: number; status: string }[];
  crowded_hours?: any;
  image?: string[];
  description: string;
  owner_ID: number;
  phone_number: string;
  address: string;
  verified?: number;
  categories?: string[];
}

export default function DataForm() {
  const [uploadFiles, setUploadFiles] = useState<any>([]);

  const router = useRouter();

  const initialValues: FormValues = {
    name: "",
    opening_at: "",
    closing_at: "",
    devices: DEVICES,
    crowded_hours: CROWDED_TIME,
    image: [],
    description: "",
    owner_ID: CURRENT_USER_ID,
    phone_number: "",
    address: "",
  };

  const [formValue, setFormValue] = useState<FormValues>(initialValues);

  const handlePropsImage = (images: any) => {
    setUploadFiles(images);
  };

  const handleOnchangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const tempValue = { ...formValue, [name]: value };
    setFormValue(tempValue);
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
    await CafeAPI.createOne(params);
    router.push("/");
  };

  return (
    <Box sx={{ paddingX: "90px", paddingY: "50px", display: "flex" }}>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <Form
          style={{ display: "flex", flexDirection: "column", width: "60%" }}
        >
          <DialogContent
            dividers
            sx={{ borderRadius: "10px", border: "1px solid black" }}
          >
            <Typography sx={{ fontSize: "32px", fontWeight: 700, my: 1 }}>
              喫茶店の追加
            </Typography>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                名前
              </Typography>
              <Field
                as={TextField}
                name="name"
                rows={4}
                required
                onChange={handleOnchangeValue}
                value={formValue.name}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="name" component="div" />
            </Box>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                場所
              </Typography>
              <Field
                as={TextField}
                name="address"
                rows={4}
                required
                onChange={handleOnchangeValue}
                value={formValue.address}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="address" component="div" />
            </Box>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                電話番号
              </Typography>
              <Field
                as={TextField}
                name="phone_number"
                rows={4}
                required
                onChange={handleOnchangeValue}
                value={formValue.phone_number}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="phone_number" component="div" />
            </Box>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                詳細情報
              </Typography>
              <Field
                as={TextField}
                name="description"
                multiline
                rows={4}
                required
                onChange={handleOnchangeValue}
                value={formValue.description}
                sx={{ width: "80%", my: 1 }}
              />
              <ErrorMessage name="description" component="div" />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 0,
              my: 2,
            }}
          >
            <Button
              autoFocus
              onClick={handleSubmit}
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
      <ImageForm
        uploadFiles={uploadFiles}
        handlePropsImage={handlePropsImage}
      />
    </Box>
  );
}
