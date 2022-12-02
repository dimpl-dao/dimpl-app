import React, {useState} from 'react';
import {Platform} from 'react-native';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Img} from 'src/components/core/Img';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {IMAGES} from 'src/modules/images';
import {KeyboardAvoidingView} from 'src/components/core/ViewComponents';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ICONS} from 'src/modules/icons';
import GradientColorRect from 'src/components/GradientColorRect';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';

type Motto = {
  text: string;
  image: string;
  width: number;
  height: number;
};

const SignInScreen = () => {
  const navToKaikasSignIn = useNavigate({screen: SCREENS.KaikasSignIn.name});
  const navToKlipSignIn = useNavigate({screen: SCREENS.KlipSignIn.name});
  const mottos: Motto[] = [
    {
      text: '간편한 중고 거래와\n 달달한 코인 리워드',
      image: IMAGES.easy,
      width: 748,
      height: 659,
    },
    {
      text: '착한자만이 살아남는\n 정의구현 시스템',
      image: IMAGES.justice,
      height: 589,
      width: 714,
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const bottomInset = useSafeAreaInsets().bottom;
  const topInset = useSafeAreaInsets().top;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      bgWhite>
      <Div flex={1} justifyCenter pt={topInset} pb={bottomInset}>
        <Div flex={1} justifyCenter>
          <Div>
            <Carousel
              data={mottos}
              itemWidth={DEVICE_WIDTH}
              autoplay
              loop
              vertical={false}
              autoplayInterval={6000}
              sliderWidth={DEVICE_WIDTH}
              renderItem={renderItem}
              onSnapToItem={setActiveSlide}
            />
            <Pagination
              dotsLength={mottos.length}
              activeDotIndex={activeSlide}
              containerStyle={{
                paddingVertical: 0,
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 10,
                marginHorizontal: -2,
                paddingHorizontal: 0,
                backgroundColor: COLORS.gray[300],
              }}
              dotElement={
                <Div w15 h10 rounded5 mx4 overflowHidden bgBlack></Div>
              }
              inactiveDotOpacity={0.6}
              inactiveDotScale={1}
            />
          </Div>
        </Div>
        <Div px20 wFull mb70>
          <Div h48>
            <Row
              bg={COLORS.klip.DEFAULT}
              rounded={10}
              h64
              flex={1}
              itemsCenter
              onPress={navToKlipSignIn}>
              <Col />
              <Col auto mr11>
                <Img source={ICONS.klip} h20 w40 />
              </Col>
              <Col auto>
                <Div>
                  <Span bold fontSize={14}>
                    클립으로 로그인
                  </Span>
                </Div>
              </Col>
              <Col />
            </Row>
          </Div>
          <Div h48 mt15>
            <Row
              rounded={10}
              bg={COLORS.kaikas.DEFAULT}
              h64
              flex={1}
              itemsCenter
              onPress={navToKaikasSignIn}>
              <Col />
              <Col auto mr11>
                <Img source={ICONS.kaikasWhite} h20 w20 />
              </Col>
              <Col auto>
                <Div>
                  <Span bold white fontSize={13}>
                    카이카스로 로그인
                  </Span>
                </Div>
              </Col>
              <Col />
            </Row>
          </Div>
        </Div>
      </Div>
    </KeyboardAvoidingView>
  );
};

const renderItem = ({item}: {item: any}) => {
  return (
    <Div rounded10 overflowHidden itemsCenter justifyCenter px30>
      <Span fontSize={24} bold style={{textAlign: 'center'}}>
        {item.text}
      </Span>
      <Div py70 itemsCenter justifyCenter>
        <Img source={item.image} w={(150 * item.width) / item.height} h={150} />
      </Div>
    </Div>
  );
};

export default SignInScreen;
