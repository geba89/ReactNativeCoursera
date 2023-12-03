import AsyncStorage from '@react-native-async-storage/async-storage'

let profileObj = null

export async function profile(){
    if(profileObj){
        return profileObj
    }

    try{
        profileObj = JSON.parse(await AsyncStorage.getItem('profile'))
        return profileObj
    }catch(e){
        console.error('Could not get profile')
        return null
    }
}

export async function updateProfile(newProfile){
    await AsyncStorage.setItem('profile', JSON.stringify(newProfile))
    profileObj = newProfile
}

export async function clearProfile(){
    await AsyncStorage.removeItem('profile')
    profileObj = null
}