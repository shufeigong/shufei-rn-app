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
  color: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Top Navigator Logo component
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
 * Top Navigator button component
 * @param props
 */
function HeaderButton(props: HeaderButtonProps) {
  const { name, color, ...rest } = props;

  return (
    <Link asChild {...rest}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color={color} name={name} />
      </TouchableOpacity>
    </Link>
  );
}

export default function tabOptions(): NativeStackNavigationOptions {
  return {
    headerTitleAlign: 'center', // center title for Android
    headerTitle: () => <LogoTitle />,
    headerLeft: () => (
      <HeaderButton name="bell" href="/notifications" color="#61DAFB" style={styles.headerButton} />
    ),
    headerRight: () => (
      <>
        <HeaderButton
          name="magnifier"
          href="/search"
          color="#61DAFB"
          style={[styles.headerButton, styles.searchButton]}
        />
        <HeaderButton name="options" href="/settings" color="#61DAFB" style={styles.headerButton} />
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
