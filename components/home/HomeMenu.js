import { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Colors, Typefaces } from '../../assets/GlobalStyles'
import HomeMenuItem from './HomeMenuItem'
import { FlatList } from 'react-native-gesture-handler'
import axios from 'axios'
import database from '../../hooks/Database'
import HomeMenuHeader from './HomeMenuHeader'

export default class HomeMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: null,
            categories: null,
            selectedCategories: [],
            searchTerm: props.searchTerm
        }
    }

    setMenuItems(items){
        this.setState({menuItems: items})
    }

    render(){
        if(!this.state.categories){
            
            this.fetchCategories()
        }

        if(this.state.searchTerm !== this.props.searchTerm){
            this.fetchMenuItems()
            this.setState({searchTerm: this.props.searchTerm})
        }



        return(
            this.state.menuItems && <>
                <Text style={[Typefaces.sectionTitle, {padding: 16}]}>ORDER FOR DELIVERY!</Text>
                <HomeMenuHeader categories={this.state.categories} selectedCategories={this.state.selectedCategories} onUpdate={(title) => {this.selectionChanged(title)}}/>
                <FlatList
                    data={this.state.menuItems}
                    renderItem={({item})=>{return(<HomeMenuItem menuItem={item}/>)}}
                    keyExtractor={(item)=>{return(item.name)}}
                />
            </>
        )
    }

    selectionChanged(title){
        let copy = this.state.selectedCategories
        let index = copy.indexOf(title)
        if(index > -1){
            copy.splice(index, 1)
        }
        else{
            copy.push(title)
        }

        this.setState({selectedCategories: copy})
        this.fetchMenuItems()
    }

    fetchCategories(){
        database().readTransaction(tx =>{
            tx.executeSql('SELECT DISTINCT category FROM items', null,
            (tx, {rows: {_array}})=>{
                this.setState({categories: _array.map(row => row.category)})
                this.fetchMenuItems()
            },
            (tx, error)=>{
                console.log(error)
                this.downloadMenuItems()
            }
            )
        })
    }

    fetchMenuItems(){
        database().readTransaction(tx =>{
            let query = 'SELECT * FROM items'
            if(this.state.selectedCategories.length > 0){
                query += ` WHERE category IN (${this.state.selectedCategories.map((e) => {return "\"" + e +"\""}).join(', ')})`
            }
            if(this.props.searchTerm.length > 0){
                query += ` ${this.state.selectedCategories.length > 0 ? 'AND' : 'WHERE'} name LIKE '%${this.props.searchTerm}%'`
            }
            tx.executeSql(query, null,
            (tx, {rows: {_array}})=>{
                this.setMenuItems(_array)
            },
            (tx, error)=>{
                console.log(error)
                this.downloadMenuItems()
            })
        })
    }

    downloadMenuItems(){
        axios.get('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then((response)=>{
                database().transaction(tx =>{
                    tx.executeSql('DROP TABLE IF EXISTS items', null,
                    ()=> {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, image TEXT, category TEXT)')
                        response.data.menu.forEach((item)=>{
                            tx.executeSql('INSERT INTO items (name, description, price, image, category) VALUES (?,?,?,?,?)', [item.name, item.description, item.price, item.image, item.category],
                            (tx, result)=>{
                                this.setMenuItems(response.data.menu)
                                this.setState({categories: response.data.menu.map((item)=>{return(item.category)})})
                            },
                            (tx, error)=>{console.log(error)}
                            )
                        }),
                        (tx, error)=>{
                            console.log(error)
                        }
                    })                    
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }
}
