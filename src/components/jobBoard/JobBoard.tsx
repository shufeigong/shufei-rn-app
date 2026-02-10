import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useFetchData from '@/hooks/useFetchData';
import { get } from '@/utils/request';
import { JobDetail, JobIds } from './jobBoard.types';
import { JobItem, JobItemProps } from './JobItem';

const PAGE_SIZE = 6;

function getItemKey(item: JobDetail, index: number): string {
  //write this function out of the JobBoard component to make the function reference stable
  return `job-${index}-${item.id}`;
}

function renderItem({ item }: JobItemProps) {
  //write this function out of the JobBoard component to make the function reference stable
  return <JobItem item={item} />;
}

export default function JobBoard() {
  // 1. Fetch all Job IDs first
  const { data: allIds, loading: loadingIds } = useFetchData<JobIds>(
    'https://hacker-news.firebaseio.com/v0/jobstories.json',
  );

  const [jobs, setJobs] = useState<JobDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // 2. Function to fetch More job details for a specific batch of IDs
  const fetchJobBatch = useCallback(async (page: number, ids: number[]) => {
    //use useCallback to make this function reference stable
    setLoadingMore(true);
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const batchIds = ids.slice(start, end);

    try {
      // Parallel requests for better performance
      const moreJobs = await Promise.all(
        batchIds.map((id) =>
          get<JobDetail>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
        ),
      );
      setJobs((prev) => [...prev, ...moreJobs]);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoadingMore(false);
    }
  }, []);

  // 3. Initial load once when IDs are ready
  useEffect(() => {
    if (allIds && allIds.length > 0 && jobs.length === 0) {
      fetchJobBatch(0, allIds);
    }
  }, [allIds, fetchJobBatch, jobs.length]);

  const handleLoadMore = useCallback(() => {
    if (!allIds || loadingMore) return;

    const nextPage = currentPage + 1;
    if (nextPage * PAGE_SIZE < allIds.length) {
      setCurrentPage(nextPage);
      fetchJobBatch(nextPage, allIds);
    }
  }, [allIds, jobs.length, loadingMore, currentPage, fetchJobBatch]);

  const renderFooter = useCallback(() => {
    //Case 1: loading more, show loading icon
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#ff6600" />
          <Text style={styles.loadingText}>Loading more jobs...</Text>
        </View>
      );
    }

    // Case 2: have load all jobs，show "No more jobs"
    if (allIds && allIds.length > 0 && jobs.length >= allIds.length) {
      return (
        <View style={styles.footerLoader}>
          <View style={styles.divider} />
          <Text style={styles.noMoreText}>No more jobs</Text>
          <View style={styles.divider} />
        </View>
      );
    }

    // Case 3: Not reach bottom, leace blank
    return <View style={{ height: 40 }} />;
  }, [loadingMore, jobs.length, allIds?.length]);

  if (loadingIds && jobs.length === 0) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={getItemKey} // getItemKey is static reference, it is stable
      renderItem={renderItem} // renderItem is static reference, it is stable
      contentContainerStyle={styles.list}
      onEndReached={handleLoadMore} // handleLoadMore is stable callback reference
      onEndReachedThreshold={0.2} // job list still has 20% reach bottom, trigger loading
      ListFooterComponent={renderFooter} // renderFooter is stable callback reference
      removeClippedSubviews={true} // unmounts and removes off-screen views from their native backing superview
      windowSize={10} // determines the total render window in units of visible lengths
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  title: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  link: { color: '#ff6600', textDecorationLine: 'underline' },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  meta: { fontSize: 12, color: '#888' },
  footerLoader: {
    paddingVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 10,
    color: '#888',
    fontSize: 20,
  },
  noMoreText: {
    color: '#bbb',
    fontSize: 18,
    marginHorizontal: 10,
  },
  divider: {
    height: 1,
    width: 30,
    backgroundColor: '#eee',
  },
});
