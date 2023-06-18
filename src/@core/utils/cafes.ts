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
    value: "エアコン最もいい",
    label: "エアコン最もいい",
  },
  {
    value: "エアコン悪い",
    label: "エアコン悪い",
  },
  {
    value: "多い",
    label: "人数が多い",
  },
  {
    value: "普通",
    label: "人数が普通",
  },
  {
    value: "少ない",
    label: "人数が少ない",
  },
];

export const timeValues = [
  {
    value: "なし",
    label: "なし",
  },
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "13",
    label: "13",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "15",
    label: "15",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "17",
    label: "17",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "19",
    label: "19",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "21",
    label: "21",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "23",
    label: "23",
  },
];
