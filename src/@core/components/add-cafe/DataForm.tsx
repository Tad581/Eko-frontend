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
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
import {
  CROWDED_TIME,
  CURRENT_USER_ID,
  DEVICES,
  timeValues,
  trafficOptions,
} from "@/@core/utils/cafes";

// ** API import
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
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginY: "20px" }}
            >
              <FormLabel id="working-time">
                <Typography
                  align="center"
                  my={1}
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: "0px",
                    color: "black",
                  }}
                >
                  営業時間
                </Typography>
              </FormLabel>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="80%"
                my={1}
                sx={{ fontSize: "16px" }}
              >
                <FormControl sx={{ mr: 1, width: "50%" }}>
                  {/* <InputLabel id="opening-at">開</InputLabel> */}
                  <Select
                    id="opening-at"
                    // label="開"
                    defaultValue={timeValues[0].value}
                    // value={time.opening_at}
                    // onChange={handleChangeTimeInput}
                    name="opening-at"
                  >
                    {timeValues.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {" - "}
                <FormControl sx={{ ml: 1, width: "50%" }}>
                  {/* <InputLabel id="closing-at">閉</InputLabel> */}
                  <Select
                    id="closing-at"
                    // label="閉"
                    defaultValue={timeValues[0].value}
                    // value={time.closing_at}
                    // onChange={handleChangeTimeInput}
                    name="closing-at"
                  >
                    {timeValues.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ my: 1 }}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FormLabel id="crowded-status">
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: 700,
                      fontSize: 16,
                      marginBottom: "0px",
                      alignItems: "center",
                    }}
                  >
                    ユーティリティー
                  </Typography>
                </FormLabel>
                {/* <RadioGroup
              aria-labelledby="crowded-status"
              name="crowded-status"
              defaultValue={trafficOptions[3].value}
              onChange={handleChangeCrowdedStatus}
            >
              {trafficOptions.map((option) => (
                <FormControlLabel
                  value={option.value}
                  key={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup> */}
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%"
                  }}
                >
                  {trafficOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          name={option.label}
                          value={option.value}
                          // checked={crowded_status.includes(option.value)}
                          // onChange={handleChangeCrowdedStatus}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
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
