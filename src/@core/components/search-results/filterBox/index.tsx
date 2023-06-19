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
  SelectChangeEvent,
  Select,
  InputLabel,
} from "@mui/material";

// ** Hooks import
import { useState, useEffect } from "react";

// ** MUI Icon import
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// ** Interfaces import
import { IFilterForm, ECrowdedStatus } from "@/interfaces";

// ** Other import
import { timeValues, trafficOptions } from "@/@core/utils/cafes";

interface Props {
  filterForm: IFilterForm;
  handleFilterFormData: any;
}

export const FilterBox = ({ filterForm, handleFilterFormData }: Props) => {
  const [time, setTime] = useState<{
    opening_at: string;
    closing_at: string;
  }>({
    opening_at: "なし",
    closing_at: "なし",
  });

  const [crowded_status, setCrowdedStatus] = useState<ECrowdedStatus>(
    ECrowdedStatus.All
  );

  const handleChangeTimeInput = (event: SelectChangeEvent) => {
    let tempArr;
    console.log(event);
    if (event.target.name === "opening-at")
      tempArr = { ...time, opening_at: event.target.value };
    else tempArr = { ...time, closing_at: event.target.value };
    setTime(tempArr);
  };

  const handleChangeCrowdedStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCrowdedStatus(event.target.value as unknown as ECrowdedStatus);
  };

  const handleSubmitFilterForm = () => {
    handleFilterFormData({ time, crowded_status });
  };

  return (
    <Box
      minWidth={"25%"}
      maxHeight={550}
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
          sx={{ marginY: "20px" }}
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
            <FormControl sx={{ mr: 1, width: "45%" }}>
              <InputLabel id="opening-at">開</InputLabel>
              <Select
                id="opening-at"
                label="開"
                defaultValue={timeValues[0].value}
                value={time.opening_at}
                onChange={handleChangeTimeInput}
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
            <FormControl sx={{ ml: 1, width: "45%" }}>
              <InputLabel id="closing-at">閉</InputLabel>
              <Select
                id="closing-at"
                label="閉"
                defaultValue={timeValues[0].value}
                value={time.closing_at}
                onChange={handleChangeTimeInput}
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
          sx={{ marginY: "20px" }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: "0px",
                alignItems: "center",
              }}
              id="crowded-status"
            >
              今店での人数
            </FormLabel>
            <RadioGroup
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
            </RadioGroup>
          </FormControl>
        </Box>
        <hr />
        <Box display="flex" justifyContent="center" width="100%" mt={2}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmitFilterForm}
          >
            当てはまり
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};
