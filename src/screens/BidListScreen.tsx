import {useNavigation} from '@react-navigation/native';
import {QueryFunction, useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {ChevronLeft} from 'react-native-feather';
import {BidCore} from 'src/components/BidCore';
import {BidFull} from 'src/components/BidFull';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {FlatList} from 'src/components/core/ViewComponents';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {COLORS} from 'src/modules/styles';
import {Bid} from 'src/types/bid';

export const BidListScreen = ({
  route: {
    params: {api, title},
  },
}: any) => {
  const limit = 20;
  const queryFn = async ({pageParam}: {pageParam: number}) => {
    return await api({cursor: pageParam, limit}).get();
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
      if (lastPage.bids?.length === 20) {
        return lastPage.cursor;
      }
      return undefined;
    },
  });
  const {goBack} = useNavigation();

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
              {title}
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
        data={data?.pages.map(page => (page as any).bids).flat(1) || []}
        renderItem={({item}: {item: Bid}) => {
          return <BidFull bid={item} />;
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
