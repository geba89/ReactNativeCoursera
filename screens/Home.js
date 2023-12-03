import { Component } from "react";
import {View} from "react-native"
import HomePageHero from "../components/home/HomePageHero";
import HomeMenu from "../components/home/HomeMenu";

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

    render(){ return(
            <View style={{height:'100%'}}>
                <HomePageHero onSearch={(text) => this.setSearchTerm(text)}/>
                <HomeMenu searchTerm={this.state.searchTerm}/>
            </View>
        )
    }

    setSearchTerm(text){
        console.log(text)
        this.setState({searchTerm: text})
    }
}