import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import TabBarIcon from '@/components/shared/TabBarIcon';

export default function TabLayout() {
  /* iOS use native Tabs (Liquid Glass Tabs can be shown here on latest iOS 26, released in Jan, 2026)
  but because we use native tabs, it can't present mock stack header like tranditional JavaScript Tabs,
  we have to set header in parent _layout Stack, I'm confident to say it is the best solution right now.
  https://docs.expo.dev/router/advanced/native-tabs/#use-stacks-inside-tabs
  even official doc doesn't provide sample code for this issue! 
  nesting a native <Stack /> layout inside the native tab is not good, 
  which will cause stuck performance issue.
  */

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor="#61DAFB" disableTransparentOnScrollEdge>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="videos">
          <Icon sf={{ default: 'video', selected: 'video.fill' }} />
          <Label>Video</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="users">
          <Icon sf={{ default: 'person', selected: 'person.fill' }} />
          <Label>User</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Android use tranditional JavaScript Tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#61DAFB',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Video',
          tabBarIcon: ({ color }) => <TabBarIcon name="camrecorder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
