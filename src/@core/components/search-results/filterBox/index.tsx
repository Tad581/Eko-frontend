// ** MUI Component import
import {
  Box,
  Checkbox,
  Typography,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";

// ** Hooks import
import { useState } from "react";

// ** MUI Icon import
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// ** Interfaces import
import { IFilterForm } from "@/interfaces";

// ** Other import
import { timeValues, devicesList, trafficOptions } from "@/@core/utils/cafes";

interface Props {
  filterForm: IFilterForm;
  handleFilterFormData: any;
}

export const FilterBox = ({ filterForm, handleFilterFormData }: Props) => {
  // const [traffic, setTraffic] = useState<string>("普通");

  // const handleCheckboxChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   checked?: boolean
  // ) => {
  //   const { name } = event.target;
  //   handleFilterFormData(name, checked);
  // };

  return (
    <Box
      minWidth={"25%"}
      maxHeight={500}
      sx={{
        border: "1px solid",
        borderRadius: "5px",
        padding: "40px",
        paddingTop: "30px",
        marginRight: "20px",
      }}
    >
      <FormControl fullWidth>
        <Box display="flex" justifyContent="space-between">
          <Typography
            align="center"
            mb={5}
            sx={{ fontWeight: 600, fontSize: 24, marginBottom: "20px" }}
          >
            フィルター
          </Typography>
          <FilterAltOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
        <hr />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ marginTop: "20px" }}
        >
          <FormLabel id="working-time">
            <Typography
              align="center"
              mb={5}
              sx={{
                fontWeight: 600,
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
            alignItems="center"
            width="100%"
            my={1}
            sx={{ fontSize: "16px" }}
          >
            <TextField
              id="outlined-start-adornment"
              label="開"
              sx={{ mr: 1, width: "45%" }}
              select
              defaultValue="なし"
            >
              {timeValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {" - "}
            <TextField
              id="outlined-start-adornment"
              sx={{ ml: 1, width: "45%" }}
              label="閉"
              select
              defaultValue="なし"
            >
              {timeValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display="flex" justifyContent="center" width="100%" mb={2}>
            <Button variant="contained" sx={{ width: "100%" }}>
              検索
            </Button>
          </Box>
        </Box>
        <hr />
        {/* <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ marginTop: "20px" }}
        >
          <Typography
            align="center"
            mb={5}
            sx={{
              fontWeight: 600,
              fontSize: 16,
              marginBottom: "0px",
              color: "black",
            }}
          >
            ユーティリティー
          </Typography>
          <FormGroup>
            {devicesList.map((device) => (
              <FormControlLabel
                key={device.value}
                control={
                  <Checkbox
                    name={device.label}
                    value={filterForm[device.value as keyof IFilterForm]}
                    onChange={handleCheckboxChange}
                  />
                }
                label={device.label}
              />
            ))}
          </FormGroup>
        </Box>
        <hr /> */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ marginTop: "20px" }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: "0px",
                alignItems: "center",
               }}
              id="working-time"
            >
              今店での人数
            </FormLabel>
            <RadioGroup
              aria-labelledby="working-time"
              name="radio-buttons-group"
              defaultValue={trafficOptions[1].value}
            >
              {trafficOptions.map((option) => (
                <FormControlLabel
                  value={option.value}
                  key={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </FormControl>
    </Box>
  );
};
