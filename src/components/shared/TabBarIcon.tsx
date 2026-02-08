import { SimpleLineIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface TabBarIconProps {
  name: ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
  size?: number;
}

export default function TabBarIcon({ name, color, size = 25 }: TabBarIconProps) {
  return <SimpleLineIcons name={name} size={size} color={color} />;
}
