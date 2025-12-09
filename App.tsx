import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

type Pokemon = {
  name?: string;
  image?: string;
  types?: string[];
  abilities?: string[];
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
  height?: number;
  weight?: number;
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
          image: data.sprites.front_default,
          types: data.types.map((t: any) => t.type.name),
          abilities: data.abilities.map((a: any) => a.ability.name),
          hp: data.stats.find((s: any) => s.stat.name === "hp")?.base_stat,
          attack: data.stats.find((s: any) => s.stat.name === "attack")?.base_stat,
          defense: data.stats.find((s: any) => s.stat.name === "defense")?.base_stat,
          speed: data.stats.find((s: any) => s.stat.name === "speed")?.base_stat,
          height: data.height,
          weight: data.weight,
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
    cardContainer: {
      backgroundColor: 'lightyellow',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 50,
      padding: 30,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
      flexShrink: 1,
      width: 200,
    },
    cardTextHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    statText: {
      fontSize: 16,
      marginVertical: 2,

    },
    image: {
      width: 150,
      height: 150,
    },
  });

  return (
    <View style={styles.container}>

      {pokeData.name && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTextHeader}>{`${pokeData.name}`}</Text>
          {pokeData.image && (
            <Image
              source={{ uri: pokeData.image }}
              style={styles.image}
            />
          )}

          {/* Stats for the Pokemon */}
          <View>
            <Text>Types: {pokeData.types?.join(', ')}</Text>
            <Text>Abilities: {pokeData.abilities?.join(', ')}</Text>
            <Text style={styles.statText}>HP: {pokeData.hp}</Text>
            <Text style={styles.statText}>Attack: {pokeData.attack}</Text>
            <Text style={styles.statText}>Defense: {pokeData.defense}</Text>
            <Text style={styles.statText}>Speed: {pokeData.speed}</Text>
            <Text style={styles.statText}>Height: {pokeData.height}</Text>
            <Text style={styles.statText}>Weight: {pokeData.weight}</Text>
          </View>
        </View>
      )}

      <Button title="Draw random Poké" onPress={getData} />
    </View>
  );
}
