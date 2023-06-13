export interface ICardItem {
  id: number;
  image?: string;
  name: string;
  address: string;
  star: number;
  business_hours: string;
}

export interface IFilterForm {
  all: boolean;
  isOpen: boolean;
  airCon: boolean;
  carPark: boolean;
  creditCard: boolean;
  delivery: boolean;
}
