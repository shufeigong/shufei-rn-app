import JobBoard from '@/components/jobBoard/JobBoard';
import { StyleSheet, View } from 'react-native';

export default function Search() {
  return (
    <View style={styles.container}>
      <JobBoard />
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
});
