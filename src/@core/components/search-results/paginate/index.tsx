// ** MUI Components import
import {
  Box,
  Pagination,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl
} from "@mui/material";

// ** Components import
import { CardItemResultPage } from "../../layouts/cardItem/ResultPage";

// ** Interfaces import
import { ICafeInfo, IFilterForm } from "@/interfaces";

// ** Hooks import
import { useEffect, useState } from "react";

// ** API import
import { CafeAPI } from "@/@core/api/cafeApi";

// ** Other import
import { objectToArray, sortOptions } from "@/@core/utils/cafes";

const pageSize = 4;

interface Props {
  filterForm: IFilterForm;
}

export const ResultPagination = ({ filterForm }: Props) => {
  const [cafeListData, setCafeListData] = useState<ICafeInfo[]>([]);

  const [showData, setShowData] = useState<ICafeInfo[]>(cafeListData);
  const [keyword, setKeyword] = useState<string | null>("");

  // For pagination
  const [pagination, setPagination] = useState<any>({
    count: 0,
    from: 0,
    to: pageSize,
    page: 1,
  });

  // Filter raw data by keyword
  useEffect(() => {
    const keywordTemp = localStorage.getItem("keyword")
      ? localStorage.getItem("keyword")
      : "";

    setKeyword(keywordTemp);
    const devices = objectToArray(filterForm);
    (async () => {
      const getAllCafe = await CafeAPI.getAll({
        name: keywordTemp,
        devices: devices,
        orderBy: "avg_star",
        orderType: "desc"
      });
      setCafeListData(getAllCafe.data);
    })();

    setPagination({
      count: 0,
      from: 0,
      to: pageSize,
      page: 1,
    });
  }, [filterForm]);

  useEffect(() => {
    const data: ICafeInfo[] = cafeListData.slice(
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
    setPagination({ ...pagination, from: from, to: to, page: page });
  };

  // For select sort mode
  const [sortMode, setSortMode] = useState<string>(sortOptions[0].value);

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
      position="relative"
    >
      <Box
        justifyContent={"flex-start"}
        alignItems={"center"}
        display={"flex"}
        width="95%"
      >
        <Typography
          component="span"
          sx={{
            justifyItems: "flex-start",
            alignContent: "flex-start",
            fontWeight: 700,
            marginRight: "10px",
          }}
        >
          キーワード:
        </Typography>
        <Typography>{keyword}</Typography>
      </Box>
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
          marginLeft={-1}
        >
          <Typography mx={1} sx={{ fontWeight: 700 }}>
            {pagination.from + 1} {" ~ "}
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
          <FormControl>

          <InputLabel id="sort-mode">エアコンへの評価</InputLabel>
          <Select
            label="エアコンへの評価"
            labelId="sort-mode"
            id="sort-mode"
            value={sortMode}
            onChange={handleChangeSortMode}
            sx={{ width: "auto", height: "40px" }}
            defaultValue={sortOptions[0].value}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          </FormControl>

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
        {showData.map((data: ICafeInfo) => (
          <CardItemResultPage
            key={data.id}
            address={data.address}
            closing_at={data.closing_at}
            current_crowded={data.current_crowded}
            description={data.description}
            device={data.device}
            id={data.id}
            name={data.name}
            owner={data.owner}
            owner_ID={data.owner_ID}
            opening_at={data.opening_at}
            phone_number={data.phone_number}
            review={data.review}
            status={data.status}
            verified={data.verified}
            images={data.images}
          />
        ))}
      </Box>
      {cafeListData.length < pageSize ? (
        <></>
      ) : (
        <Pagination
          count={Math.ceil(cafeListData.length / 4)}
          onChange={handlePageChange}
          page={pagination.page}
        />
      )}
    </Box>
  );
};
