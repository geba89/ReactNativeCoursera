import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Colors, Typefaces } from '../../assets/GlobalStyles';

export default function HomeMenuHeader({categories, selectedCategories, onUpdate}){
    return(
        <View>
        <FlatList
            horizontal={true}
            ItemSeparatorComponent={()=><View style={{width: 8}}/>}
            data={categories}
            renderItem={({item})=>{return(<HomeHeaderButton title={item} selected={selectedCategories.includes(item)} onPress={() => {onUpdate(item)}}/>)}}
            keyExtractor={(item)=>{return(item)}}
        />
        </View>
    )
}

function HomeHeaderButton({title, selected = false, onPress = ()=>{}}){
    return(
        <TouchableOpacity style={[styles.button, {backgroundColor: selected ? Colors.primary2 : Colors.secondary3}]} onPress={onPress}>
            <Text style={[Typefaces.specialsTitle, {color: Colors.primary1}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: Number.MAX_SAFE_INTEGER,
        padding:8
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 8
    },
})