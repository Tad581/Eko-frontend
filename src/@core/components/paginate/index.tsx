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

// ** Others import
import { cafesList } from "@/@core/utils/cafes";

const pageSize = 4;

interface IFilterForm {
  all: boolean;
  isOpen: boolean;
  airCon: boolean;
  carPark: boolean;
  creditCard: boolean;
  delivery: boolean;
}

interface Props {
  filterForm: IFilterForm;
}

export const ResultPagination = ({ filterForm }: Props) => {
  const [cafeListData, setCafeListData] =
    useState<ICardItemResultPage[]>(cafesList);

  const [showData, setShowData] = useState<ICardItemResultPage[]>(cafeListData);

  // Filter raw data by keyword
  useEffect(() => {
    const keyword = localStorage.getItem("keyword");
    console.log("filterForm :>> ", filterForm);
    const filterData = cafesList
      .filter(
        (cafe: any) =>
          cafe.name.includes(keyword) ||
          cafe.name.toLowerCase().includes(keyword)
      )
      .filter((cafe: any) => {
        if (filterForm.airCon)
          return cafe.coffee_shop_devices.find(
            (device: any) => device.name === "air conditioner"
          );
        return true;
      })
      .filter((cafe: any) => {
        if (filterForm.carPark)
          return cafe.coffee_shop_devices.find(
            (device: any) => device.name === "car park"
          );
        return true;
      })
      .filter((cafe: any) => {
        if (filterForm.creditCard)
          return cafe.coffee_shop_devices.find(
            (device: any) => device.name === "credit card"
          );
        return true;
      })
      .filter((cafe: any) => {
        if (filterForm.delivery)
          return cafe.coffee_shop_devices.find(
            (device: any) => device.name === "delivery"
          );
        return true;
      });
    setCafeListData(filterData);
  }, [filterForm]);

  // For pagination
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    const data: ICardItemResultPage[] = cafeListData.slice(
      pagination.from,
      pagination.to
    );
    setPagination({ ...pagination, count: cafeListData.length });
    setShowData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cafeListData, pagination.from, pagination.to]);

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
            {pagination.to === cafeListData.length + 1
              ? pagination.to - 1
              : cafeListData.length < pageSize
              ? cafeListData.length
              : pagination.to}
          </Typography>
          件を表示 / 全
          <Typography mx={1} sx={{ fontWeight: 700 }}>
            {cafeListData.length}{" "}
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
        {showData.map((data: ICardItemResultPage) => (
          <CardItemResultPage
            star={data.star}
            business_hours={data.business_hours}
            id={data.id}
            name={data.name}
            address={data.address}
            key={data.id}
            image={data.image}
          />
        ))}
      </Box>
      {cafeListData.length < pageSize ? (
        <></>
      ) : (
        <Pagination
          count={Math.ceil(cafeListData.length / 4)}
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};
