import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './src/screens/HomeScreen';
import CamaraScreen from './src/screens/CamaraScreen';
import LocalizationScreen from './src/screens/LocalizationScreen';
import MapScreen from './src/screens/MapScreen';
import PlayAudioScreen from './src/screens/PlayAudioScreen';
import PlayVideoScreen from './src/screens/PlayVideoScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="CamaraScreen"
        component={CamaraScreen}
        options={{ drawerLabel: 'Camara' }}
      />
      <Drawer.Screen
        name="LocalizationScreen"
        component={LocalizationScreen}
        options={{ drawerLabel: 'Ubicación' }}
      />
      <Drawer.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ drawerLabel: 'Mapa' }}
      />
      <Drawer.Screen
        name="PlayAudioScreen"
        component={PlayAudioScreen}
        options={{ drawerLabel: 'Reproducir Audio' }}
      />
      <Drawer.Screen
        name="PlayVideoScreen"
        component={PlayVideoScreen}
        options={{ drawerLabel: 'Reproducir Video' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};
