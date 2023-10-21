import React, { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { atomLinkList } from '../states/atomLinkList';

import Header from '../components/header/Header';
import Typography from '../components/Typography';
import Button from '../components/Button';
import HeaderTitle from '../components/header/HeaderTitle';
import Icon from '../components/Icon';
import Spacer from '../components/Spacer';

export default function LinkListScreen() {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const data = useRecoilValue(atomLinkList);

  const onPressListItem = useCallback((item) => {
    navigation.navigate('LinkDetail', { item });
  }, []);

  const onPressButton = useCallback(() => {
    navigation.navigate('AddLink');
  }, []);

  // sectionList
  const sectionData = useMemo(() => {
    const dataList = {};

    // 생성일자 string
    const makeDataString = (createdAt) => {
      const dataItem = new Date(createdAt);

      return `${dataItem.getFullYear()}. ${dataItem.getMonth()}. ${dataItem.getDay()} ${dataItem.getMinutes()} ${dataItem.getMinutes()}`;
    };

    if (!data.list) return [];

    data.list.forEach((item) => {
      const keyName = makeDataString(item.createdAt);
      if (!dataList[keyName]) {
        dataList[keyName] = [item];
      } else {
        dataList[keyName].push(item);
      }
    });

    return Object.keys(dataList).map((item) => {
      return {
        title: item,
        data: dataList[item],
      };
    });
  }, [data.list]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <HeaderTitle title="LINK LIST" />
      </Header>

      <SectionList
        style={{ flex: 1 }}
        sections={sectionData}
        renderSectionHeader={({ section }) => {
          return (
            <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'white' }}>
              <Typography color="gray" size={12}>
                {section.title}
              </Typography>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <Button onPress={() => onPressListItem(item)}>
            <View style={{ padding: 16 }}>
              <Typography size={20}>{item.link}</Typography>
              <Spacer space={4} />
              <Typography fontSize={16} color="gray">
                {item.title !== '' ? `${item.title.slice(0, 20)} | ` : ''} {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </View>
          </Button>
        )}
      />
      <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom }}>
        <Button onPress={onPressButton}>
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
