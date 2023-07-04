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
  SelectChangeEvent,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import CrowdedTime from "./CrowdedTime";
import ImageForm from "./ImageForm";

// ** Icons import
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// ** Hook import
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ** Other import
import axios from "axios";
import {
  CROWDED_TIME,
  CURRENT_USER_ID,
  devicesList,
  timeValuesForAdd,
} from "@/@core/utils/cafes";

// ** API import
import { CafeAPI } from "@/@core/api/cafeApi";

interface FormValues {
  name: string;
  opening_at: string;
  closing_at: string;
  status?: number;
  devices: any;
  crowded_hours?: any;
  image?: string[];
  description: string;
  owner_ID: number;
  phone_number: string;
  address: string;
  verified?: number;
  categories?: string[];
}

const convertTimeArray = (timeArray: string[]) => {
  const convertTime = timeArray.map((hour: string) => {
    if (hour[0] === "0") return parseInt(hour[1], 10);
    else return parseInt(hour.slice(0, 2), 10);
  });
  return convertTime;
};

export default function DataForm() {
  const [uploadFiles, setUploadFiles] = useState<any>([]);

  const [crowded_status, setCrowded_status] = useState<any>(CROWDED_TIME);

  const router = useRouter();

  const initialValues: FormValues = {
    name: "",
    opening_at: timeValuesForAdd[0].value,
    closing_at: timeValuesForAdd[0].value,
    devices: [],
    crowded_hours: crowded_status,
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

  const handleChangeTimeInput = (event: SelectChangeEvent) => {
    let tempArr;
    if (event.target.name === "opening-at")
      tempArr = { ...formValue, opening_at: event.target.value };
    else tempArr = { ...formValue, closing_at: event.target.value };
    setFormValue(tempArr);
  };

  // const handleChangeDeviceList = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = JSON.parse(event.target.value);
  //   console.log(value);
  //   const index = formValue.devices.findIndex((item: any) => {
  //     return value.name === item.name;
  //   });
  //   if (index === -1) {
  //     const tempArr = [...formValue.devices, value];
  //     setFormValue({ ...formValue, devices: tempArr });
  //   } else {
  //     const tempArr = formValue.devices.filter(
  //       (device: any) => device.name !== value.name
  //     );
  //     setFormValue({ ...formValue, devices: tempArr });
  //   }
  //   console.log(formValue);
  // };

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
        console.log("🚀 ~ file: DataForm.tsx:176 ~ handleSubmit ~ reviewImages:", reviewImages)
      } catch (error) {
        // Handle the error
      }
    }
    const params = { ...formValue, images: [...reviewImages] };
    await CafeAPI.createOne(params);
    router.push("/");
  };

  useEffect(() => {
    setFormValue({ ...formValue, crowded_hours: [...crowded_status] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crowded_status]);

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
                sx={{ width: "70%", my: 1 }}
              />
              <ErrorMessage name="description" component="div" />
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
            {/* <Box sx={{ my: 1 }}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
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
                      marginTop: 1,
                    }}
                  >
                    ユーティリティー
                  </Typography>
                </FormLabel>

                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "70%",
                  }}
                >
                  {devicesList.map((option) => (
                    <FormControlLabel
                      key={option.label}
                      control={
                        <Checkbox
                          name={option.label}
                          value={JSON.stringify(option.value)}
                          checked={formValue.devices.some(
                            (item: any) => item.name === option.value.name
                          )}
                          onChange={handleChangeDeviceList}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box> */}
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                平日の混雑状態
              </Typography>
              <CrowdedTime handleCrowdedTime={handleCrowdedTimeNormalDay} />
            </Box>
            <Box
              sx={{ my: 0.5 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                週末の混雑状態
              </Typography>
              <CrowdedTime handleCrowdedTime={handleCrowdedTimeWeekendDay} />
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
