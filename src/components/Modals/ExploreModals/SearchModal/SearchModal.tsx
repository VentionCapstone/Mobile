import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from 'src/components/Button/Button';
import Collapsable from 'src/components/Collapsable/Collapsable';
import Icon from 'src/components/Icon/Icon';
import Text from 'src/components/Text/Text';
import ThemedView from 'src/components/ThemedView/ThemedView';
import { getIsDarkMode } from 'src/store/selectors';
import { BLACK, BUTTON_SIZES, LEVEL_1, WHITE, WHITE_100 } from 'src/styles';
import { IconName } from 'src/types';

import { styles } from './SearchModal.styles';
import { COLLAPSABLE_CARDS_POSITIONS } from './SearchModal.utils';

type ExploreModalProps = {
  modalOpen: boolean;
  changeOpen: () => void;
};

const SearchModal = ({ modalOpen, changeOpen }: ExploreModalProps) => {
  const colors = useSelector(getIsDarkMode);

  const [isCollapsed, setIsCollapsed] = useState(COLLAPSABLE_CARDS_POSITIONS.whenPressed);

  const toggleCollapseWhen = () => {
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.whenPressed);
  };

  const toggleCollapseWhere = () => {
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.wherePressed);
  };

  const toggleCollapseGuests = () => {
    setIsCollapsed(COLLAPSABLE_CARDS_POSITIONS.guestsPressed);
  };

  return (
    <Modal
      animationType="fade"
      visible={modalOpen}
      onRequestClose={() => {
        changeOpen();
      }}
    >
      <StatusBar backgroundColor={colors ? BLACK : WHITE_100} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors ? BLACK : WHITE_100,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 50,
            marginBottom: 20,
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity
            style={[
              styles.icon,
              LEVEL_1,
              {
                backgroundColor: colors ? BLACK : WHITE,
                borderColor: colors ? WHITE : BLACK,
                shadowColor: colors ? WHITE : BLACK,
              },
            ]}
            onPress={() => changeOpen()}
          >
            <Icon name={IconName.Close} size={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Accomodations</Text>
          <View style={{ width: 34 }} />
        </View>
        <View>
          <Collapsable
            title="Where"
            subtitle="Nowhere"
            contentTitle="Somewhere"
            collapsed={isCollapsed.where}
            onTouch={toggleCollapseWhere}
          >
            <Text>Something</Text>
          </Collapsable>
          <Collapsable
            title="When"
            subtitle="Never"
            contentTitle="Sometime"
            collapsed={isCollapsed.when}
            onTouch={toggleCollapseWhen}
          >
            <Text>Something</Text>
          </Collapsable>
          <Collapsable
            title="Guests"
            subtitle="None"
            contentTitle="Someone"
            collapsed={isCollapsed.guests}
            onTouch={toggleCollapseGuests}
          >
            <Text>Something</Text>
          </Collapsable>
        </View>
      </SafeAreaView>
      <ThemedView
        style={[
          {
            height: 100,
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          LEVEL_1,
        ]}
      >
        <Text style={styles.title}>Footer</Text>
        <Button onPress={() => changeOpen()} title="Search" size={BUTTON_SIZES.MD} />
      </ThemedView>
    </Modal>
  );
};

export default SearchModal;
