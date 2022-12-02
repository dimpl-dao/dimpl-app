import {QueryFunction, useInfiniteQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ChevronLeft, Plus} from 'react-native-feather';
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
import {Search} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'src/components/ViewComponents';
import useEdittableText from 'src/hooks/useEdittableText';

export const ListingSearchScreen = () => {
  const searchRef = useRef(null);
  const limit = 15;
  const [text, handleChangeText] = useState<string>('');
  const handleChangeQuery = (text: string) => {
    handleChangeText(text);
    refetch();
  };
  const {goBack} = useNavigation();
  const onPressSearch = () => {
    // @ts-ignore
    searchRef?.current?.focus();
  };
  const queryFn = async (params: {pageParam?: string; queryKey: any[]}) => {
    console.log(params);
    return await APIS.listing
      .search(limit, params?.pageParam, params.queryKey[1].keyword)
      .getWithToken();
  };
  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    queryKey: [APIS.listing.search().key, {keyword: text}],
    queryFn: queryFn,
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
        <Row itemsCenter h45 px15>
          <Col auto rounded100 mr20 onPress={goBack}>
            <ChevronLeft
              strokeWidth={2}
              color={COLORS.black}
              height={25}
              width={25}
            />
          </Col>
          <Col>
            <TextInput
              innerRef={searchRef}
              value={text}
              placeholder="피드 검색"
              fontSize={16}
              bgGray200
              rounded100
              m0
              p0
              px8
              h32
              bold
              onChangeText={handleChangeQuery}
            />
          </Col>
          <Col auto rounded100 ml20 onPress={onPressSearch}>
            <Search
              strokeWidth={2}
              color={COLORS.black}
              height={22}
              width={22}
            />
          </Col>
        </Row>
      }>
      <>
        <Div flex={1} relative>
          <FlatList
            flex={1}
            keyExtractor={(item: Listing) => item.id}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            data={
              data?.pages?.map(page => (page as any).listings).flat(1) || []
            }
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
                <Div h={50} />
              </>
            }
          />
        </Div>
      </>
    </ScreenWrapper>
  );
};
