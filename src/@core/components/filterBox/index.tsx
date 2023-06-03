// ** MUI Component import
import {
  Box,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";

// ** MUI Icon import
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export const FilterBox = () => {
  return (
    <Box
      maxWidth={400}
      sx={{
        border: "1px solid",
        borderRadius: "5px",
        padding: "40px",
        paddingTop: "30px",
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
          <RadioGroup
            aria-labelledby="working-time"
            defaultValue="isOpen"
            name="radio-buttons-group"
          >
            <FormControlLabel value="all" control={<Radio />} label="すべて" />
            <FormControlLabel
              value="isOpen"
              control={<Radio />}
              label="開いています"
            />
          </RadioGroup>
        </Box>
        <hr />
        <Box
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
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="駐車場"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="エアコン"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="クレジットカード"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="配送"
            />
          </FormGroup>
        </Box>
      </FormControl>
    </Box>
  );
};
