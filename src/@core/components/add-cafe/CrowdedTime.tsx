// ** Components import
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

// ** Hooks import
import { useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";

// ** Other import
import { timeValuesForMultiSelect } from "@/@core/utils/cafes";

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

export default function CrowdedTime() {
  const theme = useTheme();
  const [secluded, setSecluded] = useState<string[]>(timeValuesForMultiSelect);
  const [normal, setNormal] = useState<string[]>([]);
  const [crowded, setCrowded] = useState<string[]>([]);

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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="少ない">少ない</InputLabel>
        <Select
          labelId="少ない"
          id="少ない"
          multiple
          value={secluded}
          onChange={handleChangeSecluded}
          input={<OutlinedInput id="少ない" label="少ない" />}
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

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="普通">普通</InputLabel>
        <Select
          labelId="普通"
          id="普通"
          multiple
          value={normal}
          onChange={handleChangeNormal}
          input={<OutlinedInput id="普通" label="普通" />}
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

      <FormControl sx={{ m: 1, width: 300 }}>
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
    </div>
  );
}
