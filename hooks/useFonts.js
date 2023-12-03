import * as Font from 'expo-font';

export default useFonts = async () => {
    await Font.loadAsync({
        'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
        'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
        'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
        'Karla-ExtraBold': require('../assets/fonts/Karla-ExtraBold.ttf'),
    })
}