export interface ICardItemHomePage {
  id: number;
  image?: string;
  name: string;
  address: string;
  star: number;
  business_hours: string;
}

export interface ICardItemResultPage extends ICardItemHomePage {
}
