import {useQuery} from '@tanstack/react-query';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Col} from 'src/components/core/Col';
import {Img} from 'src/components/core/Img';
import {Span} from 'src/components/core/Span';
import {ListingFull} from 'src/components/ListingFull';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import ImageCarousel from 'src/components/ImageCarousel';
import {ChevronLeft, Heart} from 'react-native-feather';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import APIS from 'src/modules/apis';
import {Platform} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'src/components/ViewComponents';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { User } from 'react-native-feather';
import {truncateAddress} from 'src/utils/blockchainUtils';
import { pebtoklay } from 'src/utils/klayUtils';
import { timediffer } from 'src/utils/timeUtil';

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
  
  const heartProps = {
    fill: 'white',
    width: 22,
    height: 22,
    color: 'black',
    strokeWidth: 2,
  }
  const shadowProps = {
    style: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    },
  };
  const notchHeight = useSafeAreaInsets().bottom;
  const {goBack} = useNavigation();
  return (
    <>
    {listing && <ScreenWrapper>
      <>
      <Div relative bgWhite flex={1}>
      <Div h={notchHeight + 50}>
        <Div absolute w={DEVICE_WIDTH} top={notchHeight + 5}>
          <Row itemsCenter py5 h40 px8>
            <Col auto onPress={goBack}>
              <ChevronLeft height={30} color={COLORS.black} strokeWidth={2} />
            </Col>
            <Col itemsEnd mx5><Heart {...heartProps}></Heart></Col>
          </Row>
        </Div>
      </Div>
      <ScrollView keyboardShouldPersistTaps="always">
          <>
            <Div relative>
              <ImageCarousel
                images={listing.image_uris}
                sliderWidth={DEVICE_WIDTH}
                sliderHeight={DEVICE_WIDTH}
              />
            </Div>
            <Div px15>
              <Row mt16 itemsCenter>
                <Col>
                <Span bold fontSize={22}>
                  {listing.title}
                </Span>
                </Col>
                <Col auto>
                <Span fontSize={17} style={{fontWeight: '600'}}>
                  {pebtoklay(listing.price) + " KLAY"}
                </Span>
                </Col>
              </Row>
              <Row pb16 itemsCenter borderBottom={0.5} borderGray200>
                <Col>
                  <Span ml3 fontSize={14} color={'gray'}>
                    {timediffer(listing.updated_at)}
                  </Span>
                </Col>
                <Col auto>
                <Span fontSize={14} color={'gray'} lineHeight={20}>
                  {"deposit " + pebtoklay(listing.deposit) + " KLAY"}
                </Span>
                </Col>
              </Row>
              <Span mx5 my15 fontSize={17}>
                {listing.description}
              </Span>
              
              
            </Div>
          </>
      </ScrollView>
    </Div>
      <Div h={notchHeight} bgWhite>
      <Row px20 py15 itemsCenter bgWhite borderTop={2} borderGray200>
          <Col auto mr15>
            <Div
              itemsCenter
              justifyCenter
              rounded100
              border={1}
              borderGray200
              h40
              w40>
              <User
                width={25}
                height={25}
                strokeWidth={1.5}
                color={COLORS.gray[700]}
              />
            </Div>
          </Col>
          <Col>
            <Div>
              <Span fontSize={13} bold>{truncateAddress(`0x${listing.user_id}`)}</Span>
            </Div>
          </Col>
          <Div
            auto
            zIndex={1}
            px14
            py8
            rounded12
            bgPrimary
            {...shadowProps}
            onPress={
              () => {}
            }>
            <Span style={{fontWeight: '600'}} white fontSize={17}>
              {"거래 제안하기"}
            </Span>
          </Div>
        </Row>
      </Div>
      </>
    </ScreenWrapper>}
    </>
  );
};
