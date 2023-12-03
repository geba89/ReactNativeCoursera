import { Button, Image, TextInput, View, Text, StyleSheet } from "react-native";
import { Component } from "react";
import { updateProfile } from "../hooks/ProfileManager";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Onboarding extends Component{

    state = {
        firstName: '',
        email: ''
    }

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.paragraph}>Let us get to know you</Text>
                    <View style={styles.inputArea}>
                        <View style={styles.textInput.container}>
                            <Text style={styles.textInput.title}>First Name</Text>
                            <TextInput style={styles.textInput.input}  text={this.state.firstName} onChangeText={(text) => {this.setState({firstName:text})}}/>
                        </View>
                        <View style={styles.textInput.container}>
                            <Text style={styles.textInput.title}>Email</Text>
                            <TextInput style={styles.textInput.input}  text={this.state.email} onChangeText={(text) => {this.setState({email:text})}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <View  style={styles.buttonContainer}> 
                        <Button title="Next" disabled={this.isNextButtonDisabled()} onPress={this.nextButtonPressed}/>
                    </View>
                </View>
            </View>
        )
    }

    nextButtonPressed = async () => {
        await updateProfile({
            firstName: this.state.firstName,
            email: this.state.email
        })
        this.props.navigation.replace('Home')
        AsyncStorage.setItem('onboardingComplete', 'true')
    }

    isNextButtonDisabled = () => {
        return this.state.firstName.length == 0 || this.state.email.length == 0
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    body:{
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    inputArea:{
        paddingBottom: 48,
        flex: 2
    },
    buttonArea:{
        flex: 1,
    },
    paragraph:{
        textAlign: 'center',
        flex: 1,
        paddingTop: 48,
        fontFamily: 'Karla-Regular',
        fontSize: 20
    },
    textInput:{
        title: {
            textAlign: 'center',
            fontFamily: 'Karla-Regular',
            fontSize: 20
        },
        input:{
            textAlign: 'center',
            borderColor: 'black',
            fontFamily: 'Karla-Regular',
            fontSize: 20,
            borderWidth: 1,
            borderRadius: 16,
            marginTop: 8
            
        },
        container:{
            marginHorizontal: 16,
            marginVertical: 8
        }
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-end",
        justifyContent: 'center',
        padding: 16,
    },
    button:{
        paddingHorizontal: 8,
        alignSelf: 'center'
    }
})