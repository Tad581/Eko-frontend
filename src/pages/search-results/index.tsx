// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/search-results/filterBox";
import { ResultPagination } from "@/@core/components/search-results/paginate";
import { UserNavbar } from "@/@core/components/layouts/navbar/user";

// ** Interfaces import
import { IFilterForm, ECrowdedStatus } from "@/interfaces";

// ** Hooks import
import { useState } from "react";


export default function Home() {
  const [filterForm, setFilterForm] = useState<IFilterForm>({
      time: {
        opening_at: "なし",
        closing_at: "なし"
      },
      crowded_status: ECrowdedStatus.Normal
  });

  const handleFilterFormData = (filterFormData: IFilterForm) => {
    const tempForm = {...filterForm}
    tempForm.time = {...filterFormData.time}
    tempForm.crowded_status = filterFormData.crowded_status
    console.log(tempForm)
    setFilterForm(tempForm);
  };

  return (
    <>
      <UserNavbar />
      <Container
        sx={{
          marginTop: "50px",
          width: "100vw",
          display: "flex",
        }}
      >
        <FilterBox
          filterForm={filterForm}
          handleFilterFormData={handleFilterFormData}
        />
        <ResultPagination filterForm={filterForm} />
      </Container>
    </>
  );
}
