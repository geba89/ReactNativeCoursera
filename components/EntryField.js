import {View, Text, StyleSheet, TextInput } from "react-native";
import { MaskedTextInput, Mask } from "react-native-mask-text";

export default function EntryField(props){
    return(
        <View style={props.style}>
            <Text>{props.title}</Text>
            {props.mask ?
            <MaskedTextInput style= {style.entry}
                value={props.text}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                type={props.type}
                mask={props.mask}
                options={props.options}
                onChangeText={(text, raw) => {
                    props.onChangeText( props.mask ? text : raw, raw)
                }}
            /> :
            <TextInput style = {style.entry}
                value={props.text}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                type={props.type}
                options={props.options}
                onChangeText={props.onChangeText}
                />
            }
        </View>
    )
}

const style = StyleSheet.create({
    title:{

    },
    entry:{
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
        borderRadius: 8,
        padding: 5
    }
})