import { atom } from 'recoil';
import { getItem, removeItem, setItem } from '../utils/AsyncStorageUtils';

const asyncStorageEffect =
  (key) =>
  async ({ setSelf, onSet }) => {
    // key값을 가져온다
    const savedValue = await getItem(key);

    // key값이 존재한다면 배열로 변환
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    // isReset이라면 삭제하고 아니라면 저장
    onSet((newValue, _, isReset) => {
      isReset ? removeItem(item) : setItem(key, JSON.stringify(newValue));
    });
  };

export const atomLinkList = atom({
  key: 'MAIN/LINK_LIST',
  default: {
    list: [],
  },
  effects: [asyncStorageEffect('MAIN/LINK_LIST')],
});
