import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import TabBarIcon from '@/components/shared/TabBarIcon';

export default function TabLayout() {
  // iOS use native liquid glass Tabs
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor="#1f99b0" disableTransparentOnScrollEdge>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="videos">
          <Icon sf={{ default: 'video', selected: 'video.fill' }} />
          <Label>视频课程</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="users">
          <Icon sf={{ default: 'person', selected: 'person.fill' }} />
          <Label>我的</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Android use tranditional JavaScript Tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1f99b0',
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
          title: '视频课程',
          tabBarIcon: ({ color }) => <TabBarIcon name="camrecorder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
