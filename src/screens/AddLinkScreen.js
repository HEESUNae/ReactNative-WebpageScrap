import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';

import { atomLinkList } from '../states/atomLinkList';

import Header from '../components/header/Header';
import SingleLineInput from '../components/SingleLineInput';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import { getOpenGraphData } from '../utils/OpenGraphData';
import { getClipboardString } from '../utils/ClipboardUtils';

const AddLinkScreen = () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);
  const [url, setUrl] = useState('');
  const [metaData, setMetaData] = useState(null);
  const { width } = Dimensions.get('window');

  // 화면 닫기
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressSave = useCallback(() => {
    if (url === '') return;
    updateList((prev) => {
      const list = [
        {
          title: '',
          image: '',
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];
      return {
        list: list.concat(prev.list),
      };
    });
    setUrl('');
  }, [url]); // url 변경되면 실행

  // 엔터키 누르면 오픈그래프 표출
  const onSubmitEditing = useCallback(async () => {
    const result = await getOpenGraphData(url);
    setMetaData(result);
  }, [url]);

  // https://naver.com
  // 클립보드
  const onGetClipboardString = useCallback(async () => {
    const result = await getClipboardString();
    if (result.startsWith('https://') || result.startsWith('http://')) {
      setUrl(result);
      const onResult = await getOpenGraphData(result);
      setMetaData({
        title: onResult.title,
        image: onResult.image,
        description: onResult.description,
      });
    }
  });

  useEffect(() => {
    onGetClipboardString();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="ADD LINK" />
        <Header.Icon name={'close'} size={20} color={'white'} onPress={onPressClose} />
      </Header>
      <View style={styles.inputWrap}>
        <SingleLineInput
          value={url}
          onChangeText={setUrl}
          placeholder={'https://example.com'}
          onSubmitEditing={onSubmitEditing}
        />
        {metaData !== null && (
          <>
            <Spacer size={20} />
            <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
              <Image source={{ uri: metaData.image }} width={width - 40} height={(width - 40) * 0.5} />
              <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                <Spacer size={10} />
                <Typography size={20} color={'#222'} weight={600}>
                  {metaData.title}
                </Typography>
                <Spacer size={4} />
                <Typography size={16} color={'#444'}>
                  {metaData.description}
                </Typography>
                <Spacer size={10} />
              </View>
            </View>
          </>
        )}
      </View>
      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: url === '' ? 'gray' : 'black' }}>
          <View style={{ height: 52, alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="white" fontSize={18}>
              저장하기
            </Typography>
          </View>
          <Spacer size={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};

export default AddLinkScreen;

const styles = StyleSheet.create({
  inputWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});
