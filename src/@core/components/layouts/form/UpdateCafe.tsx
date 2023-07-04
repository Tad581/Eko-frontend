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
  Paper,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { CafeAPI } from "@/@core/api/cafeApi";

// ** Other import
import axios from "axios";
import {
  CROWDED_TIME,
  CURRENT_USER_ID,
  timeValuesForAdd,
} from "@/@core/utils/cafes";
import CrowdedTime from "../../add-cafe/CrowdedTime";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    paddingBottom: 20,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "none",
  },
}));

interface DialogTitleProps {
  id: string;
  onClose: () => void;
  children?: React.ReactNode;
}

interface FormValues {
  name: string;
  opening_at: string;
  closing_at: string;
  status?: number;
  devices?: { name: string; quantity: number; status: string }[];
  crowded_hours?: any;
  images?: string[];
  description: string;
  owner_ID: number;
  phone_number: string;
  address: string;
  verified?: number;
  categories?: string[];
}

interface IProps extends FormValues {
  handleClose: () => void;
  open: boolean;
  coffee_shop_ID: number;
}

const convertTimeArray = (timeArray: string[]) => {
  const convertTime = timeArray.map((hour: string) => {
    if (hour[0] === "0") return parseInt(hour[1], 10);
    else return parseInt(hour.slice(0, 2), 10);
  });
  return convertTime;
};

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} maxWidth={"none"}>
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

export default function UpdateCafe(props: IProps) {
  const [formValue, setFormValue] = useState<FormValues>({
    name: props.name,
    opening_at: props.opening_at,
    closing_at: props.closing_at,
    status: props.status,
    devices: props.devices,
    crowded_hours: props.crowded_hours,
    images: props.images,
    description: props.description,
    owner_ID: props.owner_ID,
    phone_number: props.phone_number,
    address: props.address,
    verified: props.verified,
    categories: props.categories,
  });

  const [previewImages, setPreviewImages] = useState<string[]>(props.images || []);

  const [crowded_status, setCrowded_status] = useState<any>(
    props.crowded_hours || CROWDED_TIME
  );

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
    const params = {
      ...formValue,
      images: [...formValue.images || [], ...reviewImages],
    };
    props.handleClose();
    await CafeAPI.updateOne({ ...params, id: props.coffee_shop_ID });
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

  const handleChangeTimeInput = (event: SelectChangeEvent) => {
    let tempArr;
    if (event.target.name === "opening-at")
      tempArr = { ...formValue, opening_at: event.target.value };
    else tempArr = { ...formValue, closing_at: event.target.value };
    setFormValue(tempArr);
  };

  const handleCrowdedTimeNormalDay = (
    crowdedTime: string[],
    normalTime: string[],
    secludedTime: string[]
  ) => {
    const crowdedIndex = convertTimeArray(crowdedTime);
    const normalIndex = convertTimeArray(normalTime);
    const tempArr = crowded_status[0].map((status: number, index: number) => {
      if (crowdedIndex.includes(index)) return 2;
      else if (normalIndex.includes(index)) return 1;
      else return 0;
    });
    setCrowded_status([[...tempArr], [...crowded_status[1]]]);
  };

  const handleCrowdedTimeWeekendDay = (
    crowdedTime: string[],
    normalTime: string[],
    secludedTime: string[]
  ) => {
    const crowdedIndex = convertTimeArray(crowdedTime);
    const normalIndex = convertTimeArray(normalTime);
    const tempArr = crowded_status[1].map((status: number, index: number) => {
      if (crowdedIndex.includes(index)) return 2;
      else if (normalIndex.includes(index)) return 1;
      else return 0;
    });
    setTimeout(() => {
      setCrowded_status([[...crowded_status[0]], [...tempArr]]);
    }, 100);
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
          喫茶店の編集
        </Typography>
      </BootstrapDialogTitle>
      <Formik initialValues={formValue} onSubmit={() => {}}>
        <Form>
          <DialogContent dividers sx={{ width: "60vw" }}>
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
                sx={{ width: "70%", my: 1 }}
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
                sx={{ width: "70%", my: 1 }}
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
                sx={{ width: "70%", my: 1 }}
              />
              <ErrorMessage name="phone_number" component="div" />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginY: "5px" }}
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
                width="70%"
                my={1}
                sx={{ fontSize: "16px" }}
              >
                <FormControl sx={{ mr: 1, width: "50%" }}>
                  {/* <InputLabel id="opening-at">開</InputLabel> */}
                  <Select
                    id="opening-at"
                    // label="開"
                    defaultValue={timeValuesForAdd[0].value}
                    value={formValue.opening_at}
                    onChange={handleChangeTimeInput}
                    name="opening-at"
                  >
                    {timeValuesForAdd.map((option) => (
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
                    defaultValue={timeValuesForAdd[0].value}
                    value={formValue.closing_at}
                    onChange={handleChangeTimeInput}
                    name="closing-at"
                  >
                    {timeValuesForAdd.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            {/* <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                平日の混雑状態
              </Typography>
              <CrowdedTime
                handleCrowdedTime={handleCrowdedTimeNormalDay}
                isUpdate={true}
                initialTime={
                  formValue.crowded_hours ? formValue.crowded_hours[0] : []
                }
              />
            </Box>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                週末の混雑状態
              </Typography>
              <CrowdedTime
                handleCrowdedTime={handleCrowdedTimeWeekendDay}
                isUpdate={true}
                initialTime={
                  formValue.crowded_hours ? formValue?.crowded_hours[1] : []
                }
              />
            </Box> */}
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
