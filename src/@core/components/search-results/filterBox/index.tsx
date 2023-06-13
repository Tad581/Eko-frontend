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

// ** Interfaces import
import { IFilterForm } from "@/interfaces";

interface Props {
  filterForm: IFilterForm,
  handleFilterFormData: any
}

export const FilterBox = ({filterForm, handleFilterFormData}: Props) => {

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ) => {
    const { name } = event.target;
    handleFilterFormData(name, checked);
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
              control={
                <Checkbox
                  name="carPark"
                  value={filterForm.carPark}
                  onChange={handleCheckboxChange}
                />
              }
              label="駐車場"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="airCon"
                  value={filterForm.airCon}
                  onChange={handleCheckboxChange}
                />
              }
              label="エアコン"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="creditCard"
                  value={filterForm.creditCard}
                  onChange={handleCheckboxChange}
                />
              }
              label="クレジットカード"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="delivery"
                  value={filterForm.delivery}
                  onChange={handleCheckboxChange}
                />
              }
              label="配送"
            />
          </FormGroup>
        </Box>
      </FormControl>
    </Box>
  );
};
