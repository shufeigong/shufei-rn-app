import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function screenOptions(): NativeStackNavigationOptions {
  return {
    title: '',
    headerTitleAlign: 'center', // center title for Android
    animation: 'slide_from_right', // Android slide navigator
    headerTintColor: '#61DAFB',

    headerTitleStyle: {
      fontWeight: '400',
      color: '#61DAFB',
      fontSize: 16,
    },
    headerBackButtonDisplayMode: 'minimal', // back button only show arrow no text "Back"
  };
}
