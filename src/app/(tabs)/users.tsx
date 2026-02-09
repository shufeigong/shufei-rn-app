import { View, Text, StyleSheet } from 'react-native';

export default function Users() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is user page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#61DAFB',
  },
});
