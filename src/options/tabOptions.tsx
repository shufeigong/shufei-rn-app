import { Href, Link } from 'expo-router';
import { Image } from 'expo-image';
import { SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { ComponentProps } from 'react';
import React from 'react';

// Extract the valid icon names from SimpleLineIcons
type IconName = ComponentProps<typeof SimpleLineIcons>['name'];

interface HeaderButtonProps {
  name: IconName; // Strictly typed to valid icons
  href: Href; // Uses Expo Router's Href type
  style?: StyleProp<TextStyle>;
}

/**
 * 导航栏 Logo 组件
 */
function LogoTitle() {
  return (
    <Image
      style={styles.logo}
      contentFit="contain"
      source={require('@/assets/react-native-logo.png')}
    />
  );
}

/**
 * 导航栏按钮组件
 * @param props
 */
function HeaderButton(props: HeaderButtonProps) {
  const { name, ...rest } = props;

  return (
    <Link asChild {...rest}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color="#1f99b0" name={name} />
      </TouchableOpacity>
    </Link>
  );
}

export default function tabOptions(): NativeStackNavigationOptions {
  return {
    headerTitleAlign: 'center', // center title for Android
    headerTitle: () => <LogoTitle />,
    headerLeft: () => <HeaderButton name="bell" href="/articles" style={styles.headerButton} />,
    headerRight: () => (
      <>
        <HeaderButton
          name="magnifier"
          href="/search"
          style={[styles.headerButton, styles.searchButton]}
        />
        <HeaderButton name="options" href="/settings" style={styles.headerButton} />
      </>
    ),
  };
}

const styles = StyleSheet.create({
  logo: {
    width: 135,
    height: 48,
  },
  headerButton: {
    padding: 8,
  },
  searchButton: {
    marginRight: 10,
  },
});
