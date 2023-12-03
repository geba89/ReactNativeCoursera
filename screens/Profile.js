import {Component} from 'react'
import { StyleSheet, ScrollView, View } from "react-native";
import { HighlightButton, PrimaryButton, SecondaryButton } from '../components/Buttons';
import CheckboxEntry from "../components/CheckboxEntry";
import EntryField from "../components/EntryField";
import ProfileAvatarView from '../components/profile/ProfileAvatarView';
import { ProfileModel, ProfileEmailPreferences} from '../models/ProfileModel';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker'
import { profile, updateProfile, clearProfile } from '../hooks/ProfileManager';
import AsyncStorage from '@react-native-async-storage/async-storage'

 export default class Profile extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        orderStatus: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
        image: null,
        hasLoaded: false
    }

    render(){

        if(!this.state.hasLoaded){
            this.loadProfile()
        }

        return(
            <ScrollView>
                <ProfileAvatarView
                    title={(this.state.firstName ? this.state.firstName[0] : '') + (this.state.lastName ? this.state.lastName[0] : '')}
                    source={this.state.image ? {uri: this.state.image} : null}
                    onChangePress={this.pickImage}
                    onRemovePress={this.removeImage}
                />
                <View>
                    <EntryField title='First name' style={style.entry} onChangeText={(text, other) => this.textText(text, other)} text={this.state.firstName}/>
                    <EntryField title='Last name' style={style.entry} onChangeText={text => this.setState({lastName: text})} text={this.state.lastName}/>
                    <EntryField title='Email' style={style.entry} onChangeText={text => this.setState({email: text})} text={this.state.email}/>
                    <EntryField title='Phone number' style={style.entry} onChangeText={text => this.setState({phoneNumber: text})} mask="(999)-999-9999" text={this.state.phoneNumber}/>
                    <CheckboxEntry title='Order statuses' style={style.checkbox}
                        value={this.state.orderStatus}
                        onValueChange={(value) => {this.setState({orderStatus: value})}}
                    />
                    <CheckboxEntry title='Password changes' style={style.checkbox}
                        value={this.state.passwordChanges}
                        onValueChange={(value) => {this.setState({passwordChanges: value})}}
                    />
                    <CheckboxEntry title='Special offers' style={style.checkbox}
                        value={this.state.specialOffers}
                        onValueChange={(value) => {this.setState({specialOffers: value})}}
                    />
                    <CheckboxEntry title='Newsletter' style={style.checkbox}
                        value={this.state.newsletter}
                        onValueChange={(value) => {this.setState({newsletter: value})}}
                    />
                </View>
                <HighlightButton title='Log out' onPress={this.logout} style={style.logoutButton}/>
                <View style={style.buttonArea}>
                    <SecondaryButton title='Discard changes' style={style.button} onPress={this.loadProfile}/>
                    <PrimaryButton title='Save changes' style={style.button} onPress={this.saveProfile}/>
                </View>
            </ScrollView>
        )
    }

    saveProfile = async() => {
        const emailPreferences = new ProfileEmailPreferences(this.state.orderStatus, this.state.passwordChanges, this.state.specialOffers, this.state.newsletter)
        const newProfile = new ProfileModel(this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNumber, emailPreferences, this.state.image)
        await updateProfile(newProfile)
    }

    loadProfile = async() => {
        const _profile = await profile()
        if(_profile){
            this.setState({
                firstName: _profile.firstName,
                lastName: _profile.lastName,
                email: _profile.email,
                phoneNumber: _profile.phoneNumber,
                orderStatus: _profile.emailPreferences?.orderStatus ?? true,
                passwordChanges: _profile.emailPreferences?.pwChanges ?? true,
                specialOffers: _profile.emailPreferences?.offers ?? true,
                newsletter: _profile.emailPreferences?.newsletter ?? true,
                image: _profile.profilePicture,
                hasLoaded: true
            })
        }else{
            this.setState({
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                orderStatus: true,
                passwordChanges: true,
                specialOffers: true,
                newsletter: true,
                image: null,
                hasLoaded: true
            })
        }
    }

    textText = (text, other) =>{
        this.setState({firstName: text})
    }

    pickImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if(permission.status !== 'granted'){return}
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })

            if(!result.canceled){
                this.setState({image: result?.uri ? result.uri : result.assets[0].uri})
            }
        }catch(e){
            console.error(e)
        }
    }

    removeImage = () => {
        this.setState({image: null})
    }

    logout = async () =>{
        clearProfile()
        this.setState({
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            orderStatus: true,
            passwordChanges: true,
            specialOffers: true,
            newsletter: true,
            image: null,
            hasLoaded: true
        })
        await AsyncStorage.removeItem('onboardingComplete')
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Onboarding'}]
        })
    }
}

const style = StyleSheet.create(
    {
        checkbox:{
            marginTop: 16,
            marginHorizontal: 16,
        },

        entry:{
            marginTop: 16,
            marginHorizontal: 16
        },

        logoutButton:{
            marginHorizontal: 16,
            marginTop: 16
        },

        buttonArea:{
            flexDirection: 'row',
            margin: 16
        },

        button:{
            flex: 1,
            marginHorizontal: 8
        }
    }
)