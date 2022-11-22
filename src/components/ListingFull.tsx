import {Listing} from 'src/types/listing';
import {Div} from './core/Div';
import {Span} from './core/Span';

export const ListingFull = ({listing}: {listing: Listing}) => {
  /**
   * @dev pls fill out ui
   */
  return (
    <Div>
      <Span>{JSON.stringify(listing)}</Span>
    </Div>
  );
};
