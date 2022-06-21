import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
  children: ReactNode;
}

export function Background({ children }: Props) {
  const { secondary80, secondary100 } = theme.colors;

  return(
    <LinearGradient
      start={{x:1, y:1}}
      style={styles.container}
      colors={[secondary80, secondary100]}
    >
      {children}
    </LinearGradient>
  )
}