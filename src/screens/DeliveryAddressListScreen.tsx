import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {QueryFunction, useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {ChevronLeft, ChevronRight} from 'react-native-feather';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {FlatList} from 'src/components/core/ViewComponents';
import {DeliveryAddressCore} from 'src/components/DeliveryAddressCore';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import APIS from 'src/modules/apis';
import {STORAGE_KEYS} from 'src/modules/storageKeys';
import {COLORS} from 'src/modules/styles';
import {DeliveryAddress} from 'src/types/deliveryAddress';

export const DeliveryAddressListScreen = ({
  route: {
    params: {callback},
  },
}: any) => {
  const api = APIS.delivery_address.list as Function;
  const limit = 20;
  const queryFn = async ({pageParam}: {pageParam: number}) => {
    return await api({cursor: pageParam, limit}).getWithToken();
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [api().key],
    queryFn: queryFn as QueryFunction,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.delivery_addresses?.length === 20) {
        return lastPage.cursor;
      }
      return undefined;
    },
  });
  const {goBack} = useNavigation();
  console.log(data?.pages);

  return (
    <ScreenWrapper
      header={
        <Row itemsCenter h45 px10>
          <Col onPress={goBack}>
            <ChevronLeft
              color={COLORS.black}
              width={30}
              height={30}
              strokeWidth={1.5}
            />
          </Col>
          <Col auto>
            <Span fontSize={19} bold>
              즐겨찾는 배송지
            </Span>
          </Col>
          <Col />
        </Row>
      }>
      <FlatList
        flex={1}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={fetchNextPage} />
        }
        data={
          data?.pages.map(page => (page as any).delivery_addresses).flat(1) ||
          []
        }
        renderItem={({item}: {item: DeliveryAddress}) => {
          return (
            <Row
              borderBottom={1}
              borderGray100
              onPress={() => callback(item)}
              itemsCenter>
              <Col>
                <DeliveryAddressCore deliveryAddress={item} />
              </Col>
              <Col auto px10>
                <ChevronRight
                  color={COLORS.black}
                  width={30}
                  height={30}
                  strokeWidth={1.5}
                />
              </Col>
            </Row>
          );
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
    </ScreenWrapper>
  );
};
