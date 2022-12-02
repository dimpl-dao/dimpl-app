import React, {useEffect} from 'react';
import {ActivityIndicator, Platform} from 'react-native';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {KeyboardAvoidingView} from 'src/components/core/ViewComponents';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import {ChevronLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useKlipLogin from 'src/hooks/useKlipLogin';
import {Img} from 'src/components/core/Img';
import {ICONS} from 'src/modules/icons';

const KlipSignInScreen = () => {
  const {goBack} = useNavigation();
  const notchHeight = useSafeAreaInsets().top;
  const notchBottom = useSafeAreaInsets().bottom;
  const headerHeight = notchHeight + 50;
  const {error, loading, prepareAuthResult, requestAuth, checkResultAndLogin} =
    useKlipLogin();
  useEffect(() => {
    requestAuth();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
      bgWhite
      relative>
      <Div h={headerHeight} top0 zIndex={5}>
        <Row
          itemsCenter
          h40
          px15
          absolute
          w={DEVICE_WIDTH}
          top={notchHeight + 5}>
          <Col justifyStart onPress={goBack}>
            <Div auto rounded100>
              <ChevronLeft
                width={30}
                height={30}
                color={COLORS.black}
                strokeWidth={2}
              />
            </Div>
          </Col>
          <Col auto>
            <Span bold fontSize={18}>
              Klip으로 로그인
            </Span>
          </Col>
          <Col />
        </Row>
      </Div>
      <Div flex={1} px15>
        <Div flex={1} itemsCenter justifyCenter>
          <Div py20>
            <Img source={ICONS.klip} h60 w120 />
          </Div>
          <Div mt16>
            <Span fontSize={19} bold textCenter>
              {prepareAuthResult
                ? 'Klip 정보 제공에 동의하셨나요?'
                : 'Dimpl이 Klip 지갑 정보를 사용하는 것을 허용해주세요.'}
            </Span>
          </Div>
          {error ? (
            <Div mt16>
              <Span danger bold fontSize={16} textCenter>
                {error}
              </Span>
            </Div>
          ) : null}
        </Div>
        <Row
          bg={loading ? COLORS.klip.light : COLORS.klip.DEFAULT}
          rounded10
          onPress={
            !loading
              ? prepareAuthResult
                ? checkResultAndLogin
                : requestAuth
              : null
          }
          p15>
          <Col />
          <Col auto>
            {loading ? (
              <ActivityIndicator />
            ) : prepareAuthResult ? (
              <Div>
                <Span bold fontSize={16}>
                  로그인 하기
                </Span>
              </Div>
            ) : (
              <Div>
                <Span bold fontSize={16}>
                  Klip 지갑 허용하기
                </Span>
              </Div>
            )}
          </Col>
          <Col />
        </Row>
      </Div>
      <Div h={notchBottom + 50} bgWhite />
    </KeyboardAvoidingView>
  );
};

export default KlipSignInScreen;
