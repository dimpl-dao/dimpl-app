import {QueryFunction, useInfiniteQuery} from '@tanstack/react-query';
import React, {useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Plus} from 'react-native-feather';
import {RefreshControl} from 'react-native-gesture-handler';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {FlatList} from 'src/components/core/ViewComponents';
import {ListingCore} from 'src/components/ListingCore';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useNavigate} from 'src/hooks/useNavigate';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import {COLORS} from 'src/modules/styles';
import {Listing} from 'src/types/listing';
import {Search, Triangle} from 'react-native-feather';
import {TextInput} from 'src/components/ViewComponents';
import useEdittableText from 'src/hooks/useEdittableText';

export const ListingFeedScreen = () => {
  const limit = 20;
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
  const searchRef = useRef(null);
  const [text, textHasChanged, handleChangeText] = useEdittableText('');
  const handleChangeQuery = text => {
    handleChangeText(text);
  };
  const navToListingCreate = useNavigate({screen: SCREENS.ListingCreate.name});
  const queryFn = async (params: {cursor?: string}) => {
    return await (
      APIS.listing.feed(limit, params?.cursor).getWithToken as Function
    )();
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [APIS.listing.feed().key],
    queryFn: queryFn as QueryFunction,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.listings?.length === limit) {
        return lastPage.cursor;
      }
      return undefined;
    },
  });
  return (
    <ScreenWrapper
      header={
        <Row itemsCenter h45 px10>
          <Col auto>
            <Span fontSize={19} bold>
              피드
            </Span>
          </Col>
          <Col />
        </Row>
      }>
      <>
            <Div bgWhite h={50} justifyCenter borderGray200>
            <Row itemsCenter py5 h40>
              <Col mr10>
                <TextInput
                  innerRef={searchRef}
                  placeholder="Search"
                  placeholderTextColor="gray"
                  fontSize={16}
                  bgGray200
                  rounded10
                  ml8
                  p0
                  px8
                  h32
                  bold
                  onPress={handleChangeQuery}
                />
              </Col>
              <Col auto rounded100 pr3 mr5>
                <Search
                  strokeWidth={2}
                  color={COLORS.black}
                  height={22}
                  width={22}
                />
              </Col>
            </Row>
          </Div>
            <Row mb5 mr8 itemsCenter style={{alignSelf: 'flex-end'}}>
            <Col
              auto
              zIndex={1}
              px12
              py6
              rounded20
              backgroundColor={"white"}
              border1
              borderGray200>
              <Span gray>
                {"Created time"}
              </Span>
            </Col>
            <Row
              auto
              zIndex={1}
              px12
              py4
              m3
              rounded20
              backgroundColor={"black"}
              border1
              borderGray200>
              <View style={{flexDirection: "row", alignItems: 'center'}}>
              <Span white>
                {"Price "}
              </Span>
              <Triangle style={{transform: [{rotate: '180deg'}]}} width={10} color={"white"} fill={"white"}></Triangle>
              </View>
            </Row>
            <Col
              auto
              zIndex={1}
              px12
              py6
              rounded20
              backgroundColor={"white"}
              border1
              borderGray200>
              <Span gray>
                {"Deposit amount"}
              </Span>
            </Col>
            </Row>
      <Div flex={1} relative>
        <FlatList
          flex={1}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={fetchNextPage} />
          }
          data={data?.pages?.map(page => (page as any).listings).flat(1) || []}
          renderItem={({item}: {item: Listing}) => {
            return <ListingCore listing={item} />;
          }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={
            <>
              {isFetchingNextPage && (
                <Div itemsCenter py15>
                  <ActivityIndicator />
                </Div>
              )}
              {!hasNextPage && (
                <Div itemsCenter py15>
                  <Span textCenter bold>
                    모두 확인했습니다.
                  </Span>
                </Div>
              )}
              <Div h={50} />
            </>
          }
        />
        <Div
          absolute
          bottom20
          right20
          rounded50
          bgPrimary
          p10
          {...shadowProps}
          onPress={navToListingCreate}>
          <Plus color={COLORS.white} width={35} height={35} />
        </Div>
      </Div>
      </>
    </ScreenWrapper>
  );
};
