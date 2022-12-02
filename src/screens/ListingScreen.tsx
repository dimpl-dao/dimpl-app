import React, {useRef} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Col} from 'src/components/core/Col';
import {Span} from 'src/components/core/Span';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import ImageCarousel from 'src/components/ImageCarousel';
import {Check, ChevronLeft, MoreVertical} from 'react-native-feather';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import APIS from 'src/modules/apis';
import {ScrollView} from 'src/components/ViewComponents';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {User} from 'react-native-feather';
import {truncateAddress} from 'src/utils/blockchainUtils';
import {pebtoklay} from 'src/utils/klayUtils';
import {timediffer} from 'src/utils/timeUtil';
import {ListingStatus} from 'src/types/listing';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {BlankProfile} from 'src/components/BlankProfile';
import {BidCore} from 'src/components/BidCore';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Bid} from 'src/types/bid';
import {useIsMine} from 'src/hooks/useIsMine';
import {useBidSelect} from 'src/hooks/useBidSelect';

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
  const isMine = useIsMine(listing?.user?.klaytn_address);
  const notchHeight = useSafeAreaInsets().top;
  const bottomInset = useSafeAreaInsets().bottom;
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  const headerStyles = useAnimatedStyle(() => {
    return {
      width: DEVICE_WIDTH,
      height: DEVICE_WIDTH,
      transform: [
        {
          scale: Math.max(-translationY.value / 100 + 1, 1),
        },
      ],
    };
  });
  const {goBack} = useNavigation();
  const navToBidCreate = useNavigate({screen: SCREENS.BidCreate.name});
  const gotoBidCreate = () => {
    navToBidCreate({listing});
  };
  const {loading, error, setError, bidSelect} = useBidSelect({
    listingHashId: listing?.hash_id_string,
  });
  return (
    <>
      {listing && (
        <ScreenWrapper>
          <>
            <Div relative flex={1}>
              <Animated.ScrollView
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                onScroll={scrollHandler}>
                <>
                  <Animated.View style={headerStyles}>
                    <ImageCarousel
                      images={listing.image_uris}
                      sliderWidth={DEVICE_WIDTH}
                      sliderHeight={DEVICE_WIDTH}
                    />
                  </Animated.View>
                  <Div px15 bgWhite>
                    <Row py14 itemsCenter borderBottom={0.5} borderGray200>
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
                            address={listing.user.klaytn_address}
                          />
                        </Div>
                      </Col>
                      <Col>
                        <Div>
                          <Span fontSize={13} bold>
                            {isMine
                              ? '나'
                              : truncateAddress(`0x${listing.user_id}`)}
                          </Span>
                        </Div>
                      </Col>
                      <Col />
                      <Col auto>
                        <ListingStatusButton
                          id={listing.id}
                          status={listing.status}
                        />
                      </Col>
                    </Row>
                    <Div py14>
                      <Div>
                        <Span bold fontSize={24}>
                          {listing.title}
                        </Span>
                      </Div>
                      <Div mt8>
                        <Span fontSize={14} color={'gray'}>
                          {timediffer(listing.updated_at)}
                        </Span>
                      </Div>
                    </Div>
                    <Div py10>
                      <Span fontSize={17}>{listing.description}</Span>
                    </Div>
                    <Div mt20 pt15 borderTop={0.5} borderGray200>
                      <Span bold fontSize={19}>
                        거래제안...
                      </Span>
                    </Div>
                    <Div py15>
                      {listing.paid_bids.map((bid: Bid) => (
                        <BidCore
                          bid={bid}
                          isListingOwner={isMine}
                          selected={bid.id === listing.bid_id}
                          bidSelect={bidSelect}
                        />
                      ))}
                    </Div>
                  </Div>
                </>
              </Animated.ScrollView>
            </Div>
            <Row
              absolute
              w={DEVICE_WIDTH}
              top={notchHeight}
              h50
              justifyCenter
              itemsCenter
              px15>
              <Col auto onPress={goBack}>
                <ChevronLeft
                  height={32}
                  width={32}
                  color={COLORS.white}
                  strokeWidth={1.2}
                />
              </Col>
              <Col />
              <Col auto onPress={goBack}>
                <MoreVertical
                  height={24}
                  width={24}
                  color={COLORS.white}
                  fill={COLORS.white}
                  strokeWidth={1.2}
                />
              </Col>
            </Row>
            <Div bgWhite>
              <Row px20 py15 itemsCenter bgWhite borderTop={1} borderGray200>
                <Col auto>
                  <Div>
                    <Span fontSize={19} style={{fontWeight: '600'}}>
                      {pebtoklay(listing.price) + ' klay'}
                    </Span>
                  </Div>
                  <Div mt2>
                    <Span fontSize={14} gray700 lineHeight={20}>
                      {'판매자 보증금 ' + pebtoklay(listing.deposit) + ' klay'}
                    </Span>
                  </Div>
                </Col>
                <Col />
                <Div
                  auto
                  zIndex={1}
                  px14
                  py8
                  rounded3
                  border={1.5}
                  onPress={gotoBidCreate}>
                  <Span style={{fontWeight: '600'}} fontSize={17}>
                    {'거래 제안하기'}
                  </Span>
                </Div>
              </Row>
            </Div>
            <Div h={bottomInset} />
          </>
        </ScreenWrapper>
      )}
    </>
  );
};

const ListingStatusButton = ({
  id,
  status,
}: {
  id: string;
  status: ListingStatus;
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
      queryClient.setQueryData([APIS.listing._(id).key], data);
    },
  });
  if (status === ListingStatus.CREATED) {
    return (
      <Div onPress={mutation.mutate}>
        <Span warning bold>
          보증금 납입확인
        </Span>
      </Div>
    );
  }
  if (status === ListingStatus.PAID) {
    return (
      <Row auto itemsCenter>
        <Span gray700>보증금 납입완료</Span>
      </Row>
    );
  }
  if (status === ListingStatus.LOCKED) {
    return (
      <Div bgBlack rounded3 px14 py8>
        <Span white>제품 전송중</Span>
      </Div>
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
