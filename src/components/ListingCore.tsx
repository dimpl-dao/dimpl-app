import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {Listing} from 'src/types/listing';
import {Div} from './core/Div';
import {Span} from './core/Span';

export const ListingCore = ({listing}: {listing: Listing}) => {
  /**
   * @dev please fill out
   */
  const navToListing = useNavigate({screen: SCREENS.Listing.name});
  const gotoListing = () => {
    navToListing({id: listing.id});
  };
  return (
    <Div onPress={gotoListing}>
      <Span>{JSON.stringify(listing)}</Span>
    </Div>
  );
};
