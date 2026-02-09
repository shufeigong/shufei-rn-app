import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is settings page</Text>
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
