import React, {Component} from 'react'
import {View, Text, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db')

class ReadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                pass: ''
            }
        }
    }

    async getUser () {
        await db.transaction(tx => {
            tx.executeSql(
                'SELECT * from "Users" WHERE "id" = 3;',
                [],
                (_, {rows: {_array}}) => {
                    console.log(_array);
                    this.setState({
                        user: {
                            name: _array[0].username.toString(),
                            pass: _array[0].password.toString()
                        }
                    });
                },
                err => console.log(err)
            );
        });
    }

    render() {
        return(
            <View>
                <Text>{this.state.user.name}</Text>
                <Text>{this.state.user.pass}</Text>
                <Button
                    title='Read from database'
                    onPress={() => this.getUser()}
                />
            </View>
        );
    }
};

export default ReadScreen;