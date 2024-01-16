import { View, TouchableOpacity } from 'react-native';
import { GREY_300, GREY_500 } from 'src/styles';
import { IconName } from 'src/types';

import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const Card = () => {
  return (
    <TouchableOpacity style={{ flex: 1, height: 480, marginVertical: 5, padding: 16 }}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: GREY_300,
          height: '75%',
          borderRadius: 15,
        }}
      >
        <Text>Image Placeholder</Text>
      </View>
      <View style={{ padding: 10, gap: 3 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Somewhere in Sweden</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name={IconName.Star} size={18} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>4.6</Text>
          </View>
        </View>
        <Text style={{ fontSize: 18 }}>29 sq.m.</Text>
        <Text style={{ fontSize: 18 }}>15-16 January</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$300/night</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
