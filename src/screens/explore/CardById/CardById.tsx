import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, ThemedView } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, GREY_300, LEVEL_1, WHITE } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './CardById.styles';

const CardById = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useSelector(getIsDarkMode);
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'rgba(0,0,0,0)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            position: 'absolute',
            zIndex: 1,
            top: 8,
            left: 0,
            right: 0,
          }}
        >
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: theme ? BLACK : WHITE,
                borderColor: theme ? WHITE : BLACK,
                shadowColor: theme ? WHITE : BLACK,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Icon name={IconName.BackChevron} color={BLACK} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: theme ? BLACK : WHITE,
                borderColor: theme ? WHITE : BLACK,
                shadowColor: theme ? WHITE : BLACK,
              },
            ]}
            onPress={() => {}}
          >
            <Icon name={IconName.HeartOutline} color={BLACK} size={24} />
          </TouchableOpacity>
        </View>

        <ScreenTemplate>
          <View style={{ height: 350, width: '100%', backgroundColor: GREY_300 }} />
          <ThemedView style={{ flex: 1 }}>
            <Text>Accomodation Name</Text>
          </ThemedView>
        </ScreenTemplate>
      </ScrollView>
      <ThemedView
        style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, height: 120 }}
      >
        <Text>Price:</Text>
        <Button title="Book" onPress={() => {}} />
      </ThemedView>
    </>
  );
};

export default CardById;
