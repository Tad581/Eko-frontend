export interface ICardItemHomePage {
  id: number;
  image?: string;
  name: string;
  address: string;
  star: number;
}

export interface ICardItemResultPage extends ICardItemHomePage {
  workingTime: string;
}
