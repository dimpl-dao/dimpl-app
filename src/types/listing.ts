export enum ListingStatus {
  CREATED = 0,
  PAID = 1,
  LOCKED = 2,
  COMPLETED = 3,
}
export type Listing = {
  id: string;
  price: number;
  deposit: number;
  remonstrable_block_interval: number;
  images: [];
};
