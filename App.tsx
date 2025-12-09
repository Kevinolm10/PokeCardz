import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function App() {

useEffect(() => {
  fetch("http://192.168.0.161:5000/")
  .then(response => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .catch(error => console.log(error))
})

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
