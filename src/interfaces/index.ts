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
  opening_at: string;
  phone_number: string;
  review: {
    star: number;
    count: number;
  };
  status: number; // Đánh giá của Admin về điều hòa của quán
  verified: number;
}

export interface IFilterForm {
  エアコン: boolean;
  駐車場: boolean;
  クレジットカード: boolean;
  配送: boolean;
}