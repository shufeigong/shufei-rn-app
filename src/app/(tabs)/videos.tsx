import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Videos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is video page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#61DAFB',
  },
  link: {
    marginTop: 20,
    fontSize: 20,
    color: '#61DAFB',
  },
});
