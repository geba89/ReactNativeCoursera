import { Component } from "react";
import {View, StyleSheet, Text, Image, TextInput} from "react-native"
import {Typefaces, Colors} from "../../assets/GlobalStyles";
import {Icon} from 'react-native-elements';
import { debounce } from "../../Util";

export default class HomePageHero extends Component {

    constructor(props) {
        super(props);
        this.onSearch = props.onSearch
    }

    render(){ return(
            <View style={styles.container}>
                <Text style={[Typefaces.title, {color: Colors.primary2}]}>Little Lemon</Text>
                <View style={styles.horizontalRuler}>
                    <View style={styles.horizontalTextArea}>
                        <Text style={[Typefaces.subtitle, {color: 'white'}]}>Chicago</Text>
                        <Text style={[Typefaces.leadText, {color: 'white'}]}>We are a family owned restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <View style={styles.spacer}/>
                    <Image style={styles.image} source={require('../../assets/images/Hero_image.png')} />
                </View>
                <View style={styles.searchArea}>
                    <Icon name='search' color='black' size={20} style={styles.searchIcon}/>
                    <TextInput style={styles.searchInput} onChangeText={(text) => this.searchChanged(text)}/>
                </View>
            </View>
        )
    }

    searchChanged(text){
        debounce(() => this.onSearch(text))
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary1,
        padding: 16,
    },

    horizontalRuler:{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
    },

    horizontalTextArea:{
        flex: 6,
    },

    image: {
        width: 140,
        height: 131,
        flex: 5,
        borderRadius: 25,
        borderWidth: 2
    },

    spacer:{
        flex: 1
    },

    searchArea: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        height: 36,
        alignContent: 'center',
        marginTop: 12
    },

    searchInput:{
        flex: 5
    },

    searchIcon:{
        justifyContent: 'center',
        height: '100%',
        paddingLeft: 4,
        marginRight: -2
    }
})