// ** MUI Components import
import {
    Box,
    Pagination,
    Typography,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
  } from "@mui/material";
  
  // ** Components import
  import { CardItemResultPage } from "../../layouts/cardItem/ResultPage";
  
  // ** Interfaces import
  import { ICafeInfo, IFilterForm, ESortMode } from "@/interfaces";
  
  // ** Hooks import
  import { useEffect, useState } from "react";
  import { useRouter } from "next/router";
  
  // ** API import
  import { CafeAPI } from "@/@core/api/cafeApi";
  
  // ** Other import
  import {
    sortOptions,
    removeUnUseFieldInParams,
    getCurrentHour,
    apiSortOptions,
    handleSortOption,
  } from "@/@core/utils/cafes";
  
  const pageSize = 4;
  
  interface Props {
    filterForm: IFilterForm;
  }
  
  export const ResultPaginationBookmark = ({ filterForm }: Props) => {
    const [cafeListData, setCafeListData] = useState<ICafeInfo[]>([]);
  
    const [showData, setShowData] = useState<ICafeInfo[]>(cafeListData);
  
    const [sortMode, setSortMode] = useState<ESortMode>(ESortMode.UserBest);
  
    const router = useRouter();
  
    // For pagination
    const [pagination, setPagination] = useState<any>({
      count: 0,
      from: 0,
      to: pageSize,
      page: 1,
    });
  
    // Filter raw data by keyword
    useEffect(() => {
  
      let params = {
        name: "", //search all bookmarked items
        orderBy: apiSortOptions[ESortMode.UserBest].orderBy,
        orderType: apiSortOptions[ESortMode.UserBest].orderType,
        opening_at: filterForm.time.opening_at,
        closing_at: filterForm.time.closing_at,
        crowded_status: filterForm.crowded_status,
        now: getCurrentHour(),
        bookmark_type: router.pathname === "/bookmark" ? "bookmarked" : "all",
      };
  
      params = removeUnUseFieldInParams(params);
      params.orderBy = handleSortOption(sortMode).orderBy;
      params.orderType = handleSortOption(sortMode).orderType;
  
      (async () => {
        const getAllCafe = await CafeAPI.getAll(params);
        setCafeListData(getAllCafe.data);
      })();
  
      setPagination({
        count: 0,
        from: 0,
        to: pageSize,
        page: 1,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterForm, sortMode]);
  
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
  
    const handleChangeSortMode = (event: SelectChangeEvent) => {
      setSortMode(event.target.value as unknown as ESortMode);
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
              {cafeListData.length > 0 ? pagination.from + 1 : 0} {" ~ "}
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
                value={sortMode as unknown as string}
                onChange={handleChangeSortMode}
                sx={{ width: "auto", height: "40px" }}
                defaultValue={sortOptions[0].value as unknown as string}
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
          {showData.length > 0 ? (
            showData.map((data: ICafeInfo) => (
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
                bookmarked={data.bookmarked}
                crowded_hours={data.crowded_hours}
              />
            ))
          ) : (
            <Typography mt={10}>マッチングデータがありません</Typography>
          )}
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
  