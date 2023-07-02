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
  images: string[];
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
  bookmarked: number;
  bookmark_count?: number;
}

export interface IFilterForm {
  time: {
    opening_at: string;
    closing_at: string;
  };
  crowded_status: ECrowdedStatus[];
}

export interface IReview {
  id: number;
  review: string;
  star: number;
  create_at: string;
  coffee_shop_ID: number;
  user_ID: number;
  avatar: string;
  email: string;
  role: number;
  username: string;
  images: string[];
  nationality: string;
}

export interface IBookmarkInput {
  user_ID: number;
  coffee_shop_ID: number;
}

export enum ECrowdedStatus {
  Crowded = 2,
  Normal = 1,
  Secluded = 0,
}

export enum ESortMode {
  UserBest = 0,
  UserWorst = 1,
  AdminBest = 2,
  AdminWorst = 3,
}

export enum ESortModeReview {
  Newest = 0,
  Oldest = 1,
}

export enum EUserNationality {
  Japan = "日本",
  VietNam = "VietNam",
  All = "全て",
}
