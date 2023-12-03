import { Image, StyleSheet, Text, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import {Avatar} from 'react-native-elements'

export default function ProfileAvatarView(props){
    return(
        <View style={style.container}>
            <Text>Avatar</Text>
            <View style={style.innerContainer}>
                <Avatar rounded={true} title={props.title} source={props.source} style={style.avatar} imageProps={{containerStyle: style.image}}/>
                <PrimaryButton title='Change' style={style.button} onPress={props.onChangePress}/>
                <SecondaryButton style={[style.button, {borderRadius: 0}]} title='Remove' onPress={props.onRemovePress}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create(
    {
        container:{
            marginHorizontal: 16,
        },

        innerContainer:{
            flexDirection: 'row',
            alignItems: 'center',
        },


        avatar:{
            height: 100,
            width: 100,
            marginRight: 16,
            backgroundColor: `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, '0')}`,
            borderRadius: Number.MAX_SAFE_INTEGER
        },

        image:{
            borderRadius: Number.MAX_SAFE_INTEGER
        },

        button:{
            marginHorizontal: 8
        }
    }
)