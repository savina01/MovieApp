import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MovieDetailsScreen({ route }) {
  const { movie } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.cover_photo }} style={styles.coverPhoto} />
      <Text style={styles.label}>Name: {movie.name}</Text>
      <Text style={styles.label}>Year: {movie.year}</Text>
      <Text style={styles.label}>Genre: {movie.genre}</Text>
      <Text style={styles.summary}>Summary: {movie.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#4E4187', 
    alignItems: 'center',
  },
  coverPhoto: {
    width: 380,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#F8FFE5', 
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#F8FFE5', 
  },
  summary: {
    fontSize: 17,
    marginTop: 10,
    color: '#F8FFE5', 
    textAlign: 'center',
    lineHeight: 22,
  },
});
