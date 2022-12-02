import {useQuery} from '@tanstack/react-query';
import APIS from 'src/modules/apis';

export const useIsMine = (address: string) => {
  const {
    data: {user},
  } = useQuery({
    queryKey: [APIS.user._().key],
    queryFn: APIS.user._().getWithToken,
    refetchOnMount: false,
  });
  const isMine = user.klaytn_address === address;
  return isMine;
};
