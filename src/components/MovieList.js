import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import axios from 'axios';

export default function MoviesListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const apiUrl = 'http://172.20.10.7:8000/movies';
    console.log('Attempting to fetch movies from:', apiUrl)
    axios.get('http://10.0.2.2:8000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No movies available.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#4E4187', 
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FFE5',
  },
  itemGenre: {
    fontSize: 16,
    color: '#F8FFE5', 
  },
});
