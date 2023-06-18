export interface ICafeInfo {
  address: string;
  category?: any;
  closing_at: string;
  current_crowded: number;
  description: string;
  device: {
    id: number;
    name: string;
    quantity: number;
    status: string;
  }[];
  id: number;
  images?: string[];
  name: string;
  owner: any;
  owner_ID: number;
  phone_number: string;
  review: {
    star: number,
    count: number
  },
  status: number; // Đánh giá của Admin về điều hòa của quán
  verified: number;
}

export interface IFilterForm {
  all: boolean;
  isOpen: boolean;
  airCon: boolean;
  carPark: boolean;
  creditCard: boolean;
  delivery: boolean;
}
