import Checkbox from "expo-checkbox"
import { View, Text, StyleSheet } from "react-native"

export default function CheckboxEntry(props){
    return(
    <View style={[style.container, props.style]}>
        <Checkbox
        disabled={props.disabled}
        value={props.value}
        onValueChange={(newValue) => props.onValueChange(newValue)}
        />
        <Text style={style.title}>{props.title}</Text>
    </View>
    )
}

const style = StyleSheet.create(
    {
        container:{
            flexDirection: 'row',
        },
        title:{
            marginLeft: 16
        }
    }
)