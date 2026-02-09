import { StyleSheet, Text, View } from 'react-native';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications page</Text>
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
