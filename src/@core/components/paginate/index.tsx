// ** MUI Components import
import {
  Box,
  Pagination,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

// ** Components import
import { CardItemResultPage } from "../cardItem/ResultPage";

// ** Interfaces import
import { ICardItemResultPage } from "@/interfaces/cardItem";

// ** Hooks import
import { useEffect, useState } from "react";

const pageSize = 4;

const fakeData: ICardItemResultPage[] = [
  {
    id: 1,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 2,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 3,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 4,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 5,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 6,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
  {
    id: 7,
    name: "カフェの名前",
    address: "2 Đinh Liệt, Hoàn Kiếm",
    rating: 3.5,
    workingTime: "08:00 - 23:00",
  },
];

export const ResultPagination = () => {
  // For pagination
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [cafeList, setCafeList] = useState<ICardItemResultPage[]>([]);

  useEffect(() => {
    const data: ICardItemResultPage[] = fakeData.slice(
      pagination.from,
      pagination.to
    );
    setPagination({ ...pagination, count: cafeList.length });
    setCafeList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event: any, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  // For select sort mode

  const [sortMode, setSortMode] = useState<string>("最もいい");

  const handleChangeSortMode = (event: SelectChangeEvent) => {
    setSortMode(event.target.value);
  };

  return (
    <Box
      justifyContent={"flex-start"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      sx={{ margin: "20px 0px" }}
      minWidth="75%"
    >
      <Box
        justifyContent={"space-between"}
        alignItems={"center"}
        display={"flex"}
        width="95%"
      >
        <Box
          justifyContent={"flex-start"}
          alignItems={"center"}
          display={"flex"}
        >
          <Typography mx={1} sx={{ fontWeight: 700 }}>
            {pagination.from + 1} ~{" "}
            {pagination.to === fakeData.length + 1
              ? pagination.to - 1
              : pagination.to}
          </Typography>
          件を表示 / 全
          <Typography mx={1} sx={{ fontWeight: 700 }}>
            {fakeData.length}{" "}
          </Typography>
          件
        </Box>
        <Box
          justifyContent={"flex-start"}
          alignItems={"center"}
          display={"flex"}
        >
          <Typography mr={3}>並べ替え</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortMode}
            onChange={handleChangeSortMode}
            sx={{ width: "150px", height: "40px" }}
          >
            <MenuItem value="最もいい">最もいい</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        width="100%"
        paddingBottom="50px"
      >
        {cafeList.map((data: ICardItemResultPage) => (
          <CardItemResultPage
            rating={data.rating}
            workingTime={data.workingTime}
            id={data.id}
            name={data.name}
            address={data.address}
            key={data.id}
          />
        ))}
      </Box>
      <Pagination
        count={Math.ceil(fakeData.length / 4)}
        onChange={handlePageChange}
      />
    </Box>
  );
};
