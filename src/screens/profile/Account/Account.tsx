import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { accountInfos } from 'src/data/mockData';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';

import { styles } from './Account.style';

const Account = () => {
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {accountInfos.map((item, index) => (
          <View style={[styles.card, { borderBottomColor: colors.border }]} key={index}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}

        <Button
          title="Edit"
          marginVertical={30}
          onPress={() => navigation.navigate('UpdateProfile', { userId: '2' })}
        />
      </View>
    </ScreenTemplate>
  );
};

export default Account;
