import { Stack } from 'expo-router';
import screenOptions from '@/options/screenOptions';
import tabOptions from '@/options/tabOptions';
import ModalCloseButton from '@/components/shared/ModalCloseButton';

export default function Layout() {
  return (
    <Stack screenOptions={screenOptions()}>
      {/* Tabs, need to config header here to support native tabs for iOS */}
      <Stack.Screen name="(tabs)" options={tabOptions()} />

      {/* Cards */}
      <Stack.Screen name="notifications/index" options={{ title: 'Notifications' }} />
      <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
      <Stack.Screen name="search/index" options={{ title: 'Search Jobs' }} />

      {/* Modal */}
      <Stack.Screen
        name="authors/[id]"
        options={{
          presentation: 'modal',
          title: 'Author',
          headerLeft: () => <ModalCloseButton />,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
