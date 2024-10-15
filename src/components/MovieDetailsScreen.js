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
      <Text style={styles.label}>Summary: {movie.summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  coverPhoto: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});
