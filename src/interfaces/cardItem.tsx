export interface ICardItemHomePage {
  id: number;
  image?: string;
  name: string;
  address: string;
}

export interface ICardItemResultPage extends ICardItemHomePage {
  rating: number;
  workingTime: string;
}
