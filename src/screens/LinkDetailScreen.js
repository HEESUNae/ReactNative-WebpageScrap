import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

import Header from '../components/header/Header';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderIcon from '../components/header/HeaderIcon';
import Spacer from '../components/Spacer';

const LinkDetailScreen = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <View style={{ flexDirection: 'row' }}>
          <HeaderIcon name={'arrow-back'} size={20} color={'white'} onPress={onPressBack} />
          <Spacer size={10} horizontal />
          <HeaderTitle title="LinkDetail" />
        </View>
      </Header>
      <WebView style={{ flex: 1 }} source={{ uri: routes.params.item.link }} />
    </View>
  );
};

export default LinkDetailScreen;
