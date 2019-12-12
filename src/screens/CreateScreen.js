import React, {useState, useEffect, Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system';
const db = SQLite.openDatabase('db.db');

class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.setupDb();
    this.getDb();
  }

  setupDb = async () => {
    try {
      await db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "Users" ("id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "username"	TEXT NOT NULL UNIQUE, "password"	TEXT NOT NULL UNIQUE);')
      }, err => console.log(err), success => console.log('success'));

    } catch(err) {
      console.log(err);
    }
  };

  getDb = async () => {
    const {uri} = await FileSystem.getInfoAsync(
      `${documentDirectory}SQLite/db.db`
    );
    console.log(uri);
  };

  async addToDb (username, password) {
    username = username.toString();
    password = password.toString();
    await db.transaction(tx => {
      tx.executeSql(`INSERT INTO "Users" ("username", "password") VALUES ('${username}', '${password}');`);
      }, err => console.log(err), success => console.log('added'));
    }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          placeholder='Enter username'
          value={this.state.username}
          onChangeText={(newText) => this.setState({username: newText})}
        />

        <TextInput
          placeholder='Enter password'
          value={this.state.password}
          onChangeText={(newText) => this.setState({password: newText})}
        />

        <Button
          title='Submit'
          onPress={() => this.addToDb(this.state.username, this.state.password)}
        />

        <Button
          title='Read Screen'
          onPress={() => this.props.navigation.navigate('Read')}
        />
      </View>
    );
  }
}

export default CreateScreen;