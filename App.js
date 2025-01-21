import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
        padding: 15,
        margin: 10,
        // backgroundColor: '#C8D96F',
        borderColor: '#0A8754',
        borderStyle: 'dashed',
    },
    content: {
        flex: 1,
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
        padding: 5,
    },
    contentCountry:{
        // borderWidth: 1,
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
        margin:4,
        fontWeight: 'bold',
    },
    imgCard:{
        width: 159,
        height: 227,
    },
    searchContainer:{
        padding: 15,
        backgroundColor: '#FBFFF5',
    },
    searchStyle:{
        borderWidth:1,
        borderColor: '#0A8754',
        borderRadius: 15,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: 'white',
    }
})

let originalData= [];

const App = () => {
  const [myData, setMyData] = useState([]);

  // ADD USEEFFECT() - Exercise 1B
  useEffect(() => {
    // ADD FETCH() - Exercise 1A
    fetch("https://mysafeinfo.com/api/data?list=countries&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if(originalData.length < 1){
            setMyData(myJson);
            originalData = myJson;
          }
        })
  }, []);

  const FilterData = (text) => {
    if(text !== ''){
      let myFilterData = originalData.filter(
          (item) =>
              item.CountryName.toLowerCase().includes(text.toLowerCase()) ||
              item.CurrencyCode.toLowerCase().includes(text.toLowerCase())
      );
      setMyData(myFilterData);
    }
    else{
      setMyData(originalData);
    }
  }

  const renderItem = ({item, index}) => {
    return (
        <View style={styles.container}>
          <Text style={styles.contentCountry}>{item.CountryName}</Text>
            <Text style={styles.content}>Currency Code: {item.CurrencyCode}</Text>
            <Text style={styles.content}>Phone Code: {item.PhoneCode}</Text>
        </View>
    );
  };

  return (
      <View style={styles.searchContainer}>
        <StatusBar/>
          <Text style={{padding:3, fontSize:22, fontWeight:'bold', color:'#0A8754', textAlign:'center'}}>🌏 Country Finder 🌎</Text>
        <Text style={{fontSize:15, fontWeight:'bold', margin: 5}}>Search:</Text>
        <TextInput style={styles.searchStyle} placeholder='Enter a country name/code' onChangeText={(text) => {FilterData(text)}}/>
        <FlatList data={myData} renderItem={renderItem} />
      </View>
  );
}

export default App;
