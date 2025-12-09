import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

type Pokemon = {
  name?: string;
  image?: string;
};

export default function App() {
  const [pokeData, setPokeData] = useState<Pokemon>({});

  function getData() {
    const min = 1;
    const max = 300;
    const randPoke = Math.floor(Math.random() * (max - min + 1)) + min;

    fetch(`http://192.168.0.161:5000/${randPoke}`)
      .then(response => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .then(data => {
        setPokeData({ 
          name: data.name, 
          image: data.sprites.front_default
        });
      })
      .catch(error => console.log(error));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Button title="Randomizer" onPress={getData} />

      {pokeData.name && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>{`${pokeData.name}`}</Text>
          {pokeData.image && (
            <Image
              source={{ uri: pokeData.image }}
              style={{ width: 100, height: 100 }}
            />
          )}
        </View>
      )}
    </View>
  );
}
