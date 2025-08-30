import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import Background from '../../components/Background';
import { SegmentedButtons, Text } from 'react-native-paper';
import Video from 'react-native-video';
import CommonCard from '../../components/ComanCard';
import { useState } from 'react';
import WebView from 'react-native-webview';
import { theme } from '../../components/theme';

const StoneDetail = ({ route }: any) => {
  const { stock } = route.params; // 👈 This is the pressed stock item

  const [value, setValue] = useState('Detail');

  return (
    <Background>
      <ScrollView>
        <View style={styles.container}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              { value: 'Detail', label: 'Detail' },
              { value: 'Video', label: 'Video' },
              //{ value: 'Certificate', label: 'Certificate' },
            ]}
          />

          {/* Show Details when "Detail" tab selected */}
          {value === 'Detail' && (
            <>
              <CommonCard title="">
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Rap</Text>
                    <Text style={styles.labelBox}>Discount</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.RAP}</Text>
                    <Text style={styles.valueBox}>{stock.DISCOUNT}</Text>
                  </View>

                  <View style={styles.column}>
                    <Text style={styles.labelBox}>PPC</Text>
                    <Text style={styles.labelBox}>Amount</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.PPC}</Text>
                    <Text style={styles.valueBox}>{stock.AMT}</Text>
                  </View>
                </View>
              </CommonCard>

              <View style={styles.columnContainer}>
                <View style={styles.column}>
                  <Image
                    source={{ uri: stock['IMAGE LINK'] }}
                    style={{ width: 350, height: 350, resizeMode: 'contain' }}
                  />
                </View>
              </View>

              <CommonCard title="">
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Shape </Text>
                    <Text style={styles.labelBox}>Weight</Text>
                    <Text style={styles.labelBox}>Color</Text>
                    <Text style={styles.labelBox}>Clarity</Text>
                    <Text style={styles.labelBox}>Lab</Text>
                    <Text style={styles.labelBox}>Location</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.SHAPE}</Text>
                    <Text style={styles.valueBox}>{stock.WEIGHT}</Text>
                    <Text style={styles.valueBox}>{stock.COLOR}</Text>
                    <Text style={styles.valueBox}>{stock.CLARITY}</Text>
                    <Text style={styles.valueBox}>{stock.LAB}</Text>
                    <Text style={styles.valueBox}>{stock.LACATION}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Packet No</Text>
                    <Text style={styles.labelBox}>Cut</Text>
                    <Text style={styles.labelBox}>Polish</Text>
                    <Text style={styles.labelBox}>Sym</Text>
                    <Text style={styles.labelBox}>Flo</Text>
                    <Text style={styles.labelBox}>Report</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.STOCK}</Text>
                    <Text style={styles.valueBox}>{stock.CUT}</Text>
                    <Text style={styles.valueBox}>{stock.POLISH}</Text>
                    <Text style={styles.valueBox}>{stock.SYM}</Text>
                    <Text style={styles.valueBox}>{stock.FLOLNT}</Text>
                    <Pressable
                      onPress={() =>
                        Linking.openURL(
                          `https://www.igi.org/verify-your-report/?r=${stock['REPORT #']}`,
                        )
                      }
                    >
                      <Text style={[styles.valueBox, { color: 'blue' }]}>
                        {stock['REPORT #']}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </CommonCard>
              <CommonCard title="">
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Luster</Text>
                    <Text style={styles.labelBox}>Length</Text>
                    <Text style={styles.labelBox}>Width</Text>
                    <Text style={styles.labelBox}>Height</Text>
                    <Text style={styles.labelBox}>Cro.Angle </Text>
                    <Text style={styles.labelBox}>Cro.Height</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.LUSTER}</Text>
                    <Text style={styles.valueBox}>{stock.LENGTH}</Text>
                    <Text style={styles.valueBox}>{stock.WIDTH}</Text>
                    <Text style={styles.valueBox}>{stock.HEIGHT}</Text>
                    <Text style={styles.valueBox}>{stock['CROWN ANGLE']} </Text>
                    <Text style={styles.valueBox}>{stock['CROWN HEIGHT']}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Culet Size</Text>
                    <Text style={styles.labelBox}>Depth %</Text>
                    <Text style={styles.labelBox}>Table %</Text>
                    <Text style={styles.labelBox}>Pav.Angle</Text>
                    <Text style={styles.labelBox}>Pav.Depth</Text>
                    <Text style={styles.labelBox}>Ratio</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock['CULET SIZE']}</Text>
                    <Text style={styles.valueBox}>{stock['DEPTH %']}</Text>
                    <Text style={styles.valueBox}>{stock['TABLE %']}</Text>
                    <Text style={styles.valueBox}>
                      {stock['PAVILION ANGLE']}
                    </Text>
                    <Text style={styles.valueBox}>
                      {stock['PAVILION DEPTH']}{' '}
                    </Text>
                    <Text style={styles.valueBox}>{stock.RATIO}</Text>
                  </View>
                </View>
              </CommonCard>
              <CommonCard title="">
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Growth Type</Text>
                    <Text style={styles.labelBox}>Measurement</Text>
                    <Text style={styles.labelBox}>Gridle Percent</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock['GROWTH TYPE']}</Text>
                    <Text style={styles.valueBox}>{stock.MEASUREMENT}</Text>
                    <Text style={styles.valueBox}>
                      {stock['GIRDLE PERCENT']}
                    </Text>
                  </View>
                </View>
                <Text style={styles.labelBox}>Gridle Name </Text>
                <Text style={styles.valueBox}>{stock['GIRDLE NAME']}</Text>
                <Text style={styles.labelBox}>Cert Comment</Text>
                <Text style={styles.valueBox}>{stock['CERT COMMENT']}</Text>
              </CommonCard>
              <CommonCard title="">
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.labelBox}>Contry</Text>
                    <Text style={styles.labelBox}>State</Text>
                    <Text style={styles.labelBox}>City</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.valueBox}>{stock.COUNTRY}</Text>
                    <Text style={styles.valueBox}>{stock.STATE}</Text>
                    <Text style={styles.valueBox}>{stock.CITY}</Text>
                  </View>
                </View>
              </CommonCard>
            </>
          )}

          {/* Show Video when "Video" tab selected */}
          {value === 'Video' && (
            <View style={styles.columnContainer}>
              <View style={styles.column}>
                <Video
                  source={{
                    uri: `https://360vidpictures.com/imaged/${stock.STOCK}/video.mp4`,
                  }}
                  style={{ width: 320, height: 300, backgroundColor: 'black' }}
                  resizeMode="stretch"
                  controls={true}
                  paused={false}
                  repeat={true}
                  muted={false}
                />
              </View>
            </View>
          )}

          {/* Show Certificate when "Certificate" tab selected */}
          {value === 'Certificate' && (
            <View style={styles.webViewContainer}>
              <WebView
                source={{
                  uri: `https://www.igi.org/verify-your-report/?r=${stock['REPORT #']}`,
                }}
                style={{ flex: 1 }}
                startInLoadingState
                scalesPageToFit
              />
            </View>
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Even spacing between items
    alignItems: 'center',
    // padding: 10,
    flexWrap: 'wrap', // Ensures responsiveness
    marginTop: 10,
  },
  column: {
    flex: 1, // Equal width for both dropdowns
    marginHorizontal: 1, // Adds spacing between columns
  },
  video: { width: '100%', height: '100%' },
  webViewContainer: {
    flex: 1,
    height: 600, // Adjust based on your UI
    marginTop: 10,
  },
  labelBox: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '800',
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 1,
    width: 'auto',
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  valueBox: {
    fontSize: 12,

    fontWeight: '800',
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 1,
    width: 'auto',
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
});

export default StoneDetail;
