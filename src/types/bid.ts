import {DeliveryAddress} from './deliveryAddress';
import {Listing} from './listing';
import {User} from './user';

export enum BidStatus {
  CREATED = 0,
  PAID = 1,
}
export type Bid = {
  id: string;
  user: User;
  listing: Listing;
  status: BidStatus;
  user_id: string;
  deposit: string;
  hash_id: string;
  hash_id_string: string;
  description: string;
  listing_id: string;
  created_block: string;
  created_at: string;
  delivery_address: DeliveryAddress;
};
