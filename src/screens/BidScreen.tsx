import React from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Div} from 'src/components/core/Div';
import {Span} from 'src/components/core/Span';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import APIS from 'src/modules/apis';
import {ScrollView} from 'src/components/ViewComponents';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListingStatus} from 'src/types/listing';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {ListingCore} from 'src/components/ListingCore';
import {DeliveryAddressCore} from 'src/components/DeliveryAddressCore';
import {Row} from 'src/components/core/Row';
import {Col} from 'src/components/core/Col';
import {ChevronLeft} from 'react-native-feather';
import {COLORS} from 'src/modules/styles';
import {BidCore} from 'src/components/BidCore';
import {BlankProfile} from 'src/components/BlankProfile';
import {truncateAddress} from 'src/utils/blockchainUtils';
import {Img} from 'src/components/core/Img';
import {pebtoklay} from 'src/utils/klayUtils';
import {timediffer} from 'src/utils/timeUtil';
import {BidStatus} from 'src/types/bid';

export const BidScreen = ({
  route: {
    params: {id},
  },
}: any) => {
  const {data} = useQuery({
    queryKey: [APIS.bid._(id).key],
    queryFn: APIS.bid._(id).get,
  });
  const bid = data?.bid;
  const listing = bid?.listing;
  const deliveryAddress = bid?.delivery_address;
  const notchHeight = useSafeAreaInsets().top;
  const bottomInset = useSafeAreaInsets().bottom;
  const {goBack} = useNavigation();
  const navToListing = useNavigate({screen: SCREENS.Listing.name});
  const gotoListing = () => {
    navToListing({id: listing.id});
  };
  const navToBidCreate = useNavigate({screen: SCREENS.BidCreate.name});
  const gotoBidCreate = () => {
    navToBidCreate({listingId: id, price: listing.price});
  };
  return (
    <>
      {bid && (
        <ScreenWrapper
          header={
            <Row itemsCenter h45 px15>
              <Col onPress={goBack}>
                <ChevronLeft
                  color={COLORS.black}
                  width={30}
                  height={30}
                  strokeWidth={1.5}
                />
              </Col>
              <Col auto>
                <Span bold fontSize={17}>
                  거래 제안
                </Span>
              </Col>
              <Col itemsEnd />
            </Row>
          }>
          <>
            <Div relative flex={1}>
              <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
                <>
                  <Row itemsCenter px15 py10>
                    <Col auto mr15>
                      <Div
                        itemsCenter
                        justifyCenter
                        rounded100
                        border={1}
                        borderBlack
                        h40
                        w40>
                        <BlankProfile
                          w={36}
                          h={36}
                          address={bid.user.klaytn_address}
                        />
                      </Div>
                    </Col>
                    <Col>
                      <Div>
                        <Span fontSize={13} bold>
                          {truncateAddress(`0x${bid.user_id}`)}
                        </Span>
                      </Div>
                    </Col>
                    <Col />
                    <Col auto>
                      <BidStatusButton id={bid.id} status={bid.status} />
                    </Col>
                  </Row>
                  <Row itemsCenter px15>
                    <Col auto w40 mr15 />
                    <Col>
                      <Div borderGray200 border={0.5} p15 rounded5>
                        <Row itemsCenter onPress={gotoListing}>
                          <Col auto mr14>
                            <Img
                              // @ts-ignore
                              uri={listing.image_uri || listing.image_uris[0]}
                              h70
                              w70
                              rounded5
                            />
                          </Col>
                          {listing.description ? (
                            <Div>
                              <Span fontSize={16}>{listing.title}</Span>
                              <Span
                                fontSize={12}
                                mt2
                                color={'gray'}
                                lineHeight={20}>
                                {'판매자 보증금 ' +
                                  pebtoklay(listing.deposit) +
                                  ' klay'}{' '}
                                • {timediffer(listing.updated_at)}
                              </Span>
                              <Span
                                fontSize={16}
                                mt6
                                style={{fontWeight: '600'}}>
                                {pebtoklay(listing.price) + ' klay'}
                              </Span>
                            </Div>
                          ) : null}
                        </Row>
                      </Div>
                      <Div borderGray200 border={0.5} p15 rounded5 mt10>
                        <Span fontSize={13} medium>
                          보증금 {parseFloat(bid.deposit) / 1e18} klay
                        </Span>
                      </Div>
                      <Div borderGray200 border={0.5} p15 rounded5 mt10>
                        <Div>
                          <Span bold fontSize={14}>
                            {deliveryAddress.name || deliveryAddress.address_ko}
                          </Span>
                        </Div>
                        <Row itemsCenter mt10>
                          <Col
                            auto
                            bgGray100
                            itemsCenter
                            justifyCenter
                            p4
                            rounded3
                            mr4>
                            <Span gray700 medium fontSize={10}>
                              도로명
                            </Span>
                          </Col>
                          <Col>
                            <Span gray700 medium fontSize={14}>
                              {deliveryAddress.address_ko}{' '}
                              {deliveryAddress.specifics}
                            </Span>
                          </Col>
                        </Row>
                      </Div>
                      <Div borderGray200 border={0.5} p15 rounded5 mt10>
                        <Span medium>{bid.description}</Span>
                      </Div>
                    </Col>
                  </Row>
                </>
              </ScrollView>
            </Div>
            <Div h={bottomInset} />
          </>
        </ScreenWrapper>
      )}
    </>
  );
};

const BidStatusButton = ({id, status}: {id: string; status: BidStatus}) => {
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
