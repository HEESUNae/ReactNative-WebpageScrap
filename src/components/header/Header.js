import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import HeaderTitle from './HeaderTitle';
import HeaderIcon from './HeaderIcon';

const Header = ({ children }) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets.top, backgroundColor: '#495E57' }}>
          <View style={styles.header}>{children}</View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

Header.Title = HeaderTitle;
Header.Icon = HeaderIcon;

export default Header;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBlockColor: 'gray',
    backgroundColor: '#495E57',
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
