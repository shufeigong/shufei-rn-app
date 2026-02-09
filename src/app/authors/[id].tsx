import { View, Text, StyleSheet } from 'react-native';

export default function Author() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Author: Shufei Gong</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#61DAFB',
  },
});
