// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/filterBox";
import { ResultPagination } from "@/@core/components/paginate";

// ** Hooks import
import { useState, useEffect } from "react";

interface IFilterForm {
  all: boolean;
  isOpen: boolean;
  airCon: boolean;
  carPark: boolean;
  creditCard: boolean;
  delivery: boolean;
}

export default function Home() {
  const [filterForm, setFilterForm] = useState<IFilterForm>({
    all: false,
    isOpen: true,
    airCon: false,
    carPark: false,
    creditCard: false,
    delivery: false,
  });

  const handleFilterFormData = (name: string, checked?: boolean) => {
    setFilterForm({ ...filterForm, [name]: checked });
  };

  return (
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
  );
}
