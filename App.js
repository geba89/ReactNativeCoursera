import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from './screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from './screens/Profile';
import Home from './screens/Home';
import useFonts from './hooks/useFonts'
import * as SplashScreen from 'expo-splash-screen'
import Header from './components/Header';

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const Stack = createNativeStackNavigator()

  useEffect(() => {
    async function prepare(){
      try{
        await useFonts()
      }catch(e){
        console.warn(e)
      }finally{
        try{
          setOnboardingComplete(await AsyncStorage.getItem('onboardingComplete'))
        }catch(e){
          console.warn(e)
        }
        finally{
          setHasLoaded(true)
        }
      }
    }

    prepare()
  }, [])



if(!hasLoaded){
  return null
}

  SplashScreen.hideAsync()

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: Header}} initialRouteName={onboardingComplete ? 'Home' : 'Onboarding'}>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Onboarding' component={Onboarding}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

