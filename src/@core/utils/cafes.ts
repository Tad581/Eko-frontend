import { ECrowdedStatus } from "@/interfaces";

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
  const paramsList = Object.keys(inputObject);
  for (let i = 0; i < paramsList.length; i++) {
    if (inputObject[paramsList[i]] === "なし") {
      delete inputObject[paramsList[i]];
      i--;
    }
  }
  return inputObject;
};

export const devicesList = [
  {
    value: "エアコン",
    label: "エアコン",
  },
  {
    value: "駐車場",
    label: "駐車場",
  },
  {
    value: "クレジットカード",
    label: "クレジットカード",
  },
  {
    value: "配送",
    label: "配送",
  },
];

export const sortOptions = [
  {
    value: "ユーザーによれば最もいい",
    label: "ユーザーによれば最もいい",
  },
  {
    value: "ユーザーによれば最も悪い",
    label: "ユーザーによれば最も悪い",
  },
  {
    value: "アドミンによれば最もいい",
    label: "アドミンによれば最もいい",
  },
  {
    value: "アドミンによれば最も悪い",
    label: "アドミンによれば最も悪い",
  },
];

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
