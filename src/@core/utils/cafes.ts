import {
  ECrowdedStatus,
  ESortMode,
  ESortModeReview,
  EUserNationality,
} from "@/interfaces";
import moment from "moment";

export const objectToArray = (inputObject: any) => {
  const devicesList = Object.keys(inputObject);
  for (let i = 0; i < devicesList.length; i++) {
    if (!inputObject[devicesList[i]]) {
      devicesList.splice(i, 1);
      i--;
    }
  }
  return devicesList;
};

export const removeUnUseFieldInParams = (inputObject: any) => {
  if (inputObject?.crowded_status == 3) {
    delete inputObject.crowded_status;
    delete inputObject.now;
  }
  if (inputObject?.opening_at === "なし") delete inputObject.opening_at;
  if (inputObject?.closing_at === "なし") delete inputObject.closing_at;

  return inputObject;
};

export const getCurrentHour = () => {
  const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  return currentDate;
};

export const devicesList = [
  {
    value: {
      name: "エアコン",
      quantity: 1,
      status: "good",
    },
    label: "エアコン",
  },
  {
    value: {
      name: "駐車場",
      quantity: 1,
      status: "good",
    },
    label: "駐車場",
  },
  {
    value: {
      name: "クレジットカード",
      quantity: 1,
      status: "good",
    },
    label: "クレジットカード",
  },
  {
    value: {
      name: "配送",
      quantity: 1,
      status: "good",
    },
    label: "配送",
  },
  {
    value: {
      name: "喫煙",
      quantity: 1,
      status: "good",
    },
    label: "喫煙",
  },
];

export const sortOptions = [
  {
    value: ESortMode.UserBest,
    label: "ユーザーによれば最もいい",
  },
  {
    value: ESortMode.UserWorst,
    label: "ユーザーによれば最も悪い",
  },
  {
    value: ESortMode.AdminBest,
    label: "アドミンによれば最もいい",
  },
  {
    value: ESortMode.AdminWorst,
    label: "アドミンによれば最も悪い",
  },
];

export const sortOptionsReview = [
  {
    value: ESortModeReview.Newest,
    label: "最新",
  },
  {
    value: ESortModeReview.Oldest,
    label: "最古",
  },
];

export const apiSortOptions = {
  [ESortMode.UserBest]: {
    orderBy: "avg_star",
    orderType: "desc",
  },
  [ESortMode.UserWorst]: {
    orderBy: "avg_star",
    orderType: "asc",
  },
  [ESortMode.AdminBest]: {
    orderBy: "status",
    orderType: "desc",
  },
  [ESortMode.AdminWorst]: {
    orderBy: "status",
    orderType: "asc",
  },
};

export const apiSortOptionsReview = {
  [ESortModeReview.Newest]: {
    orderBy: "create_at",
    orderType: "desc",
  },
  [ESortModeReview.Oldest]: {
    orderBy: "create_at",
    orderType: "asc",
  },
};

export const nationalityFilterOption = [
  EUserNationality.Japan,
  EUserNationality.VietNam,
  EUserNationality.All,
];

export const handleSortOption = (option: ESortMode) => {
  return apiSortOptions[option];
};

export const handleSortOptionReview = (option: ESortModeReview) => {
  return apiSortOptionsReview[option];
};

export const trafficOptions = [
  {
    value: ECrowdedStatus.Crowded,
    label: "多い",
  },
  {
    value: ECrowdedStatus.Normal,
    label: "普通",
  },
  {
    value: ECrowdedStatus.Secluded,
    label: "少ない",
  },
  // {
  //   value: ECrowdedStatus.All,
  //   label: "全て",
  // },
];

export const timeValues = [
  {
    value: "なし",
    label: "なし",
  },
  {
    value: "00:00",
    label: "00:00",
  },
  {
    value: "01:00",
    label: "01:00",
  },
  {
    value: "02:00",
    label: "02:00",
  },
  {
    value: "03:00",
    label: "03:00",
  },
  {
    value: "04:00",
    label: "04:00",
  },
  {
    value: "05:00",
    label: "05:00",
  },
  {
    value: "06:00",
    label: "06:00",
  },
  {
    value: "07:00",
    label: "07:00",
  },
  {
    value: "08:00",
    label: "08:00",
  },
  {
    value: "09:00",
    label: "09:00",
  },
  {
    value: "10:00",
    label: "10:00",
  },
  {
    value: "11:00",
    label: "11:00",
  },
  {
    value: "12:00",
    label: "12:00",
  },
  {
    value: "13:00",
    label: "13:00",
  },
  {
    value: "14:00",
    label: "14:00",
  },
  {
    value: "15:00",
    label: "15:00",
  },
  {
    value: "16:00",
    label: "16:00",
  },
  {
    value: "17:00",
    label: "17:00",
  },
  {
    value: "18:00",
    label: "18:00",
  },
  {
    value: "19:00",
    label: "19:00",
  },
  {
    value: "20:00",
    label: "20:00",
  },
  {
    value: "21:00",
    label: "21:00",
  },
  {
    value: "22:00",
    label: "22:00",
  },
  {
    value: "23:00",
    label: "23:00",
  },
];

export const timeValuesForAdd = [
  {
    value: "00:00",
    label: "00:00",
  },
  {
    value: "00:30",
    label: "00:30",
  },
  {
    value: "01:00",
    label: "01:00",
  },
  {
    value: "01:30",
    label: "01:30",
  },
  {
    value: "02:00",
    label: "02:00",
  },
  {
    value: "02:30",
    label: "02:30",
  },
  {
    value: "03:00",
    label: "03:00",
  },
  {
    value: "03:30",
    label: "03:30",
  },
  {
    value: "04:00",
    label: "04:00",
  },
  {
    value: "05:00",
    label: "05:00",
  },
  {
    value: "06:00",
    label: "06:00",
  },
  {
    value: "07:00",
    label: "07:00",
  },
  {
    value: "08:00",
    label: "08:00",
  },
  {
    value: "09:00",
    label: "09:00",
  },
  {
    value: "10:00",
    label: "10:00",
  },
  {
    value: "11:00",
    label: "11:00",
  },
  {
    value: "12:00",
    label: "12:00",
  },
  {
    value: "13:00",
    label: "13:00",
  },
  {
    value: "14:00",
    label: "14:00",
  },
  {
    value: "15:00",
    label: "15:00",
  },
  {
    value: "16:00",
    label: "16:00",
  },
  {
    value: "17:00",
    label: "17:00",
  },
  {
    value: "18:00",
    label: "18:00",
  },
  {
    value: "19:00",
    label: "19:00",
  },
  {
    value: "20:00",
    label: "20:00",
  },
  {
    value: "21:00",
    label: "21:00",
  },
  {
    value: "22:00",
    label: "22:00",
  },
  {
    value: "23:00",
    label: "23:00",
  },
  {
    value: "04:30",
    label: "04:30",
  },
  {
    value: "05:30",
    label: "05:30",
  },
  {
    value: "06:30",
    label: "06:30",
  },
  {
    value: "07:30",
    label: "07:30",
  },
  {
    value: "08:30",
    label: "08:30",
  },
  {
    value: "09:30",
    label: "09:30",
  },
  {
    value: "10:30",
    label: "10:30",
  },
  {
    value: "11:30",
    label: "11:30",
  },
  {
    value: "12:30",
    label: "12:30",
  },
  {
    value: "13:30",
    label: "13:30",
  },
  {
    value: "14:30",
    label: "14:30",
  },
  {
    value: "15:30",
    label: "15:30",
  },
  {
    value: "16:30",
    label: "16:30",
  },
  {
    value: "17:30",
    label: "17:30",
  },
  {
    value: "18:30",
    label: "18:30",
  },
  {
    value: "19:30",
    label: "19:30",
  },
  {
    value: "20:30",
    label: "20:30",
  },
  {
    value: "21:30",
    label: "21:30",
  },
  {
    value: "22:30",
    label: "22:30",
  },
  {
    value: "23:30",
    label: "23:30",
  },
];

export const timeValuesForMultiSelect = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const CURRENT_USER_ID = 4;

export const CROWDED_TIME = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0],
];
