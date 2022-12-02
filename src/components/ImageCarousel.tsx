import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import {expandImageViewer} from 'src/utils/imageViewerUtils';
import {Div} from './core/Div';
import {Img} from './core/Img';

export default function ImageCarousel({
  images,
  sliderWidth,
  sliderHeight,
}: {
  images: string[];
  sliderWidth: number;
  sliderHeight: number;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePressImage = (index: number) => expandImageViewer(images, index);
  return (
    <>
      <Div borderGray200 overflowHidden relative>
        <Carousel
          data={images}
          vertical={false}
          // @ts-ignore
          bounces={false}
          itemWidth={sliderWidth}
          sliderWidth={sliderWidth}
          onSnapToItem={index => setCurrentPage(index)}
          renderItem={({item, index}) => (
            <CarouselItem
              uri={item}
              width={sliderWidth}
              height={sliderHeight}
              onPress={() => handlePressImage(index)}
            />
          )}
        />
        <Div absolute bottom10 w={DEVICE_WIDTH} itemsCenter justifyCenter>
          <Pagination
            dotsLength={images.length}
            activeDotIndex={currentPage}
            containerStyle={{
              paddingTop: 8,
              paddingBottom: 0,
              borderRadius: 100,
            }}
            dotStyle={{
              width: 7,
              height: 7,
              borderRadius: 5,
              marginHorizontal: -5,
            }}
            inactiveDotColor={COLORS.gray[400]}
            inactiveDotScale={1}
            dotColor={COLORS.white}
          />
        </Div>
      </Div>
    </>
  );
}

function CarouselItem({
  uri,
  width,
  height,
  onPress,
}: {
  uri: string;
  width: number;
  height: number;
  onPress: Function;
}) {
  return (
    <Div>
      <Div w={width} h={height} bgGray200 relative onPress={onPress}>
        <Img w={width} h={height} uri={uri} absolute />
      </Div>
    </Div>
  );
}
