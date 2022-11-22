import {useQuery} from '@tanstack/react-query';
import {Div} from 'src/components/core/Div';
import {ListingFull} from 'src/components/ListingFull';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import APIS from 'src/modules/apis';

export const ListingScreen = ({
  route: {
    params: {id},
  },
}: any) => {
  const {data} = useQuery({
    queryKey: [APIS.listing._(id).key],
    queryFn: APIS.listing._(id).get,
  });
  const listing = data?.listing;
  /**
   * @dev please fill header
   */
  return (
    <ScreenWrapper>
      {listing && <ListingFull listing={listing} />}
    </ScreenWrapper>
  );
};
