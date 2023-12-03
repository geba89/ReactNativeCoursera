import {View, Text, StyleSheet, Image} from 'react-native'
import { Typefaces } from '../../assets/GlobalStyles'

export default function HomeMenuItem({menuItem}){
    return(
        <View style={styles.container}>
            <View style={styles.textArea}>
                <Text style={Typefaces.cardTitle}>{menuItem?.name ?? null}</Text>
                <Text style={[Typefaces.paragraph, {paddingVertical: 4}]}>{menuItem?.description ?? null}</Text>
                <Text>${menuItem?.price.toFixed(2) ?? null}</Text>
            </View>
            <View style={styles.spacer}/>
            <Image style={styles.image} source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${menuItem?.image ?? ''}?raw=true`}}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        padding: 16
    },

    textArea:{
        flex: 2,
    },

    spacer:{
        width: 16
    },
    image:{
        flex: 1,
        resizeMode: 'cover',
        height: 100,
        borderWidth: 2,
    }
})