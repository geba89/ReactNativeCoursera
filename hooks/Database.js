import {openDatabase} from 'expo-sqlite'

let databaseObj = null

export default function database(){
    if(databaseObj){
        return databaseObj
    }

    databaseObj = openDatabase('littlelemon.db')
    return databaseObj
}