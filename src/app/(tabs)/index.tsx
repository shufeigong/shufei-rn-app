import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.link}>Shufei Gong's React Naive App</Text>
      <Link style={styles.link} href="/authors/1">
        Open author Modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1f5fe',
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
