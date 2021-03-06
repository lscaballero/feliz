import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionBar from './ActionBar';
import AddBirthday from './AddBirthday';

export default function ListBirthday() {
  const [showList, setShowList] = useState(true);
  return (
    <View style={styles.container}>
      {showList ? (
        <React.Fragment>
          <Text>List Bithday</Text>
          <Text>List Bithday</Text>
          <Text>List Bithday</Text>
          <Text>List Bithday</Text>
          <Text>List Bithday</Text>
          <Text>List Bithday</Text>
        </React.Fragment>
      ) : (
        <AddBirthday />
      )}

      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
});
