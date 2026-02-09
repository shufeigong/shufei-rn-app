import { memo } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { JobDetail } from './jobBoard.types';

export interface JobItemProps {
  item: JobDetail;
}

export const JobItem = memo(function JobItem({ item }: JobItemProps) {
  const date = new Date(item.time * 1000).toLocaleDateString();

  const handlePress = () => {
    if (item.url) Linking.openURL(item.url);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity disabled={!item.url} onPress={handlePress} activeOpacity={0.7}>
        <Text style={[styles.title, item.url && styles.link]}>{item.title}</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.meta}>By: {item.by}</Text>
        <Text style={styles.meta}>{date}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#333', lineHeight: 22 },
  link: { color: '#ff6600', textDecorationLine: 'underline' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  meta: { fontSize: 12, color: '#999' },
});
