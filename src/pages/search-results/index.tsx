// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/search-results/filterBox";
import { ResultPagination } from "@/@core/components/search-results/paginate";
import { UserNavbar } from "@/@core/components/layouts/navbar/user";

// ** Interfaces import
import { IFilterForm } from "@/interfaces";

// ** Hooks import
import { useState } from "react";

export default function Home() {
  const [filterForm, setFilterForm] = useState<IFilterForm>({
    エアコン: false,
    駐車場: false,
    クレジットカード: false,
    配送: false,
  });

  const handleFilterFormData = (name: string, checked?: boolean) => {
    setFilterForm({ ...filterForm, [name]: checked });
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
