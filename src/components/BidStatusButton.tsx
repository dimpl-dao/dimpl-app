import React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import APIS from 'src/modules/apis';
import {BidStatus} from 'src/types/bid';
import {ListingStatus} from 'src/types/listing';
import {Div} from './core/Div';
import {Span} from './core/Span';
import {Row} from './core/Row';

export const BidStatusButton = ({
  id,
  status,
}: {
  id: string;
  status: BidStatus;
}) => {
  const queryClient = useQueryClient();
  const checkListingStatus = async () => {
    const res = (APIS.listing._(id).patchWithToken as Function)({
      id,
      status: ListingStatus.PAID,
    });
    if (res.success) {
      return res;
    }
    new Error();
  };
  const mutation = useMutation({
    mutationFn: checkListingStatus,
    onSuccess: data => {
      queryClient.setQueryData([APIS.bid._(id).key], data);
    },
  });
  if (status === BidStatus.CREATED) {
    return (
      <Div onPress={mutation.mutate}>
        <Span warning bold>
          보증금 미확인
        </Span>
      </Div>
    );
  }
  if (status === BidStatus.PAID) {
    return (
      <Row auto itemsCenter>
        <Span gray700>보증금 납입완료</Span>
      </Row>
    );
  }
  return (
    <Div bgInfo rounded3 px14 py8>
      <Span white bold>
        거래 완료
      </Span>
    </Div>
  );
};
