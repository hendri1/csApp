export interface OffersInterface {
  count: number;
  data: Array<data>;
}

export interface data {
  id: number;
  title: string;
  message: string;
  image: string;
}