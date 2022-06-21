import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

/*export type RootStackParams = {
  Home: undefined;
  SignIn: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};*/

export type RootStackParams = {
  Home: undefined;
  SignIn: undefined;
  AppointmentDetails: undefined | {};
  AppointmentCreate: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();

export function AppRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
      <Screen 
        name='Home'
        component={Home}
      />
      <Screen 
        name='AppointmentDetails'
        component={AppointmentDetails}
      />
      <Screen 
        name='AppointmentCreate'
        component={AppointmentCreate}
      />
    </Navigator>
  );
}