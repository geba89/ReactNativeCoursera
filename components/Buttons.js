import { Button, Pressable, StyleSheet, Text, Touchble, View } from "react-native"
import { Colors } from "../assets/GlobalStyles"

export function PrimaryButton(props){
    return(
        <Pressable style={[style.button, props.style]} onPress={(event)=>{props.onPress(event)}}>
            <Text style={{
                color: props?.color ?? 'white',
                textAlign: 'center'
            }}>{props.title}</Text>
        </Pressable>
    )
}

export function SecondaryButton(props){
    return <PrimaryButton style={[style.secondary, props.style]} color={Colors.primary1} title={props.title} onPress={props.onPress}/>
}

export function HighlightButton(props){
    return <PrimaryButton style={[style.highlight, props.style]} title={props.title} onPress={props.onPress}/>
}

const style = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary1,
        padding: 16,
        borderRadius: 8,
    },

    secondary:{
        borderColor: Colors.primary1,
        borderWidth: 1,
        backgroundColor: 'transparent'
    },

    highlight: {
        backgroundColor: Colors.primary2,
        color: Colors.primary1
    }
})

