import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {Listing} from 'src/types/listing';
import {Div} from './core/Div';
import {Col} from './core/Col';
import {Row} from './core/Row';
import {Span} from './core/Span';
import ImageSlideShow from './core/ImageSlideShow';
import {StyleSheet} from 'react-native';
import { Heart } from 'react-native-feather';
import { pebtoklay } from 'src/utils/klayUtils';
import { timediffer } from 'src/utils/timeUtil';

export const ListingCore = ({listing}: {listing: Listing}) => {
  const heartProps = {
        fill: 'red',
        width: 17,
        height: 17,
        color: 'white',
        strokeWidth: 2,
      }
  const full = 1
  const navToListing = useNavigate({screen: SCREENS.Listing.name});
  const gotoListing = () => {
    navToListing({id: listing.id});
  };

  return (
    <>
    <Div py5 borderBottom={0.5} borderGray200 bgWhite onPress={gotoListing} style={sheet.Container}>

            <Div mt7 ml7 mr7 mb7>
              <ImageSlideShow
                imageUris={[listing.image_uri]}
                sliderHeight={150}
                sliderWidth={150}
              />
            </Div>
    {listing.description? (
            <Div style={sheet.Iconcon} w190>
              <Div>
                <Span fontSize={23} mt6 mb3>
                  {listing.title}
                </Span>
                <Span fontSize={14} mb10 color={'gray'}>
                  {timediffer(listing.updated_at)}
                </Span>
                <Span fontSize={17} style={{fontWeight: '600'}}>
                  {pebtoklay(listing.price) + " KLAY"}
                </Span>
                <Span fontSize={14} mt2 color={'gray'} lineHeight={20}>
                  {"deposit\n" + pebtoklay(listing.deposit) + " KLAY"}
                </Span>
              </Div>
              <Row itemsCenter px10 mb8 mt0>
              <Col />
                <>
                    <Col auto mr4>
                      {<Heart {...heartProps}></Heart>}
                    </Col>
                    <Col auto>
                      <Span
                        fontSize={13}
                        style={{fontWeight: '600'}}
                        color={'gray'}>
                          5
                      </Span>
                    </Col>
                  </>
              </Row>
            </Div>
          ) : null}
    </Div>
  </>
  );
};

const sheet = StyleSheet.create({
  Container : {
    flexDirection: "row"
  },
  Iconcon : {
    justifyContent : 'space-between'
  },
  title : {
    marginBottom : 80,
    fontSize: 20
  },
  time : {
    marginBottom : 8
  },
  content : {
    marginBottom : 8
  } 
});