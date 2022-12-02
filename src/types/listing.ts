import {User} from './user';

export enum ListingStatus {
  CREATED = 0,
  PAID = 1,
  TRANSACTING = 2,
  COMPLETED = 3,
  LOCKED = 4,
}
export type Listing = {
  id: string;
  user: User;
  price: number;
  deposit: number;
  image_uri?: string;
  image_uris?: string[];
  description: string;
  title: string;
  updated_at: string;
  status: ListingStatus;
  remonstrable_block_interval: number;
  images: [];
};
