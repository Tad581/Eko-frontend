// ** Components import
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Typography, TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";

// ** Hooks import
import { useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";

// ** Other import
import { timeValuesForMultiSelect } from "@/@core/utils/cafes";

interface IProps {
  handleCrowdedTime: any;
  initialTime?: any;
  isUpdate?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const convertIndexToTime = (index: number) => {
  if (index < 10) return "0" + index + ":00";
  else return index + ":00";
};

export default function CrowdedTime(props: IProps) {
  const theme = useTheme();
  const [secluded, setSecluded] = useState<string[]>(timeValuesForMultiSelect);
  const [normal, setNormal] = useState<string[]>([]);
  const [crowded, setCrowded] = useState<string[]>([]);

  const handleInitialData = (crowded_hours: number[]) => {
    const secludedIndex: string[] = [];
    const normalIndex: string[] = [];
    const crowdedIndex: string[] = [];

    crowded_hours.forEach((status: number, index) => {
      if (status === 0) {
        secludedIndex.push(convertIndexToTime(index));
      } else if (status === 1) {
        normalIndex.push(convertIndexToTime(index));
      } else crowdedIndex.push(convertIndexToTime(index));
    });
    setSecluded([...secludedIndex]);
    setNormal([...normalIndex]);
    setCrowded([...crowdedIndex]);
  };

  const handleChangeCrowded = (event: SelectChangeEvent<typeof crowded>) => {
    const {
      target: { value },
    } = event;
    setCrowded(typeof value === "string" ? value.split(",") : value);
    setNormal(normal.filter((time) => !value.includes(time)));
    setSecluded(secluded.filter((time) => !value.includes(time)));
  };

  const handleChangeNormal = (event: SelectChangeEvent<typeof normal>) => {
    const {
      target: { value },
    } = event;
    setNormal(typeof value === "string" ? value.split(",") : value);
    setSecluded(secluded.filter((time) => !value.includes(time)));
    setCrowded(crowded.filter((time) => !value.includes(time)));
  };

  const handleChangeSecluded = (event: SelectChangeEvent<typeof secluded>) => {
    const {
      target: { value },
    } = event;
    setSecluded(typeof value === "string" ? value.split(",") : value);
    setNormal(normal.filter((time) => !value.includes(time)));
    setCrowded(crowded.filter((time) => !value.includes(time)));
  };

  useEffect(() => {
    props.handleCrowdedTime(crowded, normal, secluded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crowded, normal, secluded]);

  useEffect(() => {
    if (props.isUpdate && props.initialTime?.length > 0) {
      handleInitialData(props.initialTime);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialTime]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width="70%"
    >
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="少ない">少ない</InputLabel>
        <Select
          labelId="少ない"
          id="少ない"
          multiple
          value={secluded}
          onChange={handleChangeSecluded}
          input={<OutlinedInput id="少ない" label="少ない" />}
          sx={{ width: "100%" }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {[...crowded, ...normal].map((time) => (
            <MenuItem
              key={time}
              value={time}
              style={getStyles(time, crowded, theme)}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="普通">普通</InputLabel>
        <Select
          labelId="普通"
          id="普通"
          multiple
          value={normal}
          onChange={handleChangeNormal}
          input={<OutlinedInput id="普通" label="普通" />}
          sx={{ width: "100%" }}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {[...secluded, ...crowded].map((time) => (
            <MenuItem
              key={time}
              value={time}
              style={getStyles(time, crowded, theme)}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="多い">多い</InputLabel>
        <Select
          labelId="多い"
          id="多い"
          multiple
          value={crowded}
          onChange={handleChangeCrowded}
          input={<OutlinedInput id="多い" label="多い" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {[...secluded, ...normal].map((time) => (
            <MenuItem
              key={time}
              value={time}
              style={getStyles(time, crowded, theme)}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
