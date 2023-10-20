import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '../components/header/Header';
import Typography from '../components/Typography';
import Button from '../components/Button';
import HeaderTitle from '../components/header/HeaderTitle';
import Icon from '../components/Icon';

export default function LinkListScreen() {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();

  console.log(safeAreaInset);

  const onPressButton = useCallback((url) => {
    navigation.navigate(url);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="LINK LIST" />
      </Header>
      <View>
        <Button onPress={() => onPressButton('LinkDetail')}>
          <Typography>Link Detail</Typography>
        </Button>
        <Button onPress={() => onPressButton('AddLink')}>
          <Typography>Link 등록하기</Typography>
        </Button>
      </View>
      <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom }}>
        <Button onPress={() => onPressButton('AddLink')}>
          <View style={styles.gotoAddBtn}>
            <Icon name="add" color="white" size={32} />
          </View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gotoAddBtn: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
