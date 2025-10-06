import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'https://www.fabiooliveira.cloud/api_aula/filmes/';
const AUTH_TOKEN = 'a8ea3f9c1e47b2d89f0d41b7f3c2d0c6';
const PRIMARY = '#a11e1e';

function formatCurrencyBRL(value) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  } catch (err) {
    return `R$ ${Number(value || 0).toLocaleString('pt-BR')}`;
  }
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL, {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }
        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filmes da Marvel</Text>
      </View>

      {loading && (
        <View style={styles.center}> 
          <ActivityIndicator size="large" color={PRIMARY} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Falha ao carregar: {error}</Text>
          <Text style={styles.hint}>Verifique sua conexão e tente novamente.</Text>
        </View>
      )}

      {!loading && !error && (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {movies.map((movie) => (
            <View style={styles.card} key={movie.codFilme}>
              <Image source={{ uri: movie.linkPoster }} style={styles.poster} />
              <View style={styles.cardBody}>
                <Text style={styles.title}>{movie.titulo}</Text>
                <Text style={styles.meta}><Text style={styles.metaLabel}>Franquia:</Text> {movie.franquia}</Text>
                <Text style={styles.meta}><Text style={styles.metaLabel}>Ano:</Text> {movie.anoLancamento}</Text>
                <Text style={styles.meta}><Text style={styles.metaLabel}>Orçamento:</Text> {formatCurrencyBRL(movie.orcamento)}</Text>
                <Text style={styles.boxOffice}><Text style={styles.boxOfficeLabel}>Bilheteria:</Text> {formatCurrencyBRL(movie.valorArrecadacao)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: { color: '#555', marginTop: 8 },
  errorText: { color: PRIMARY, fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  hint: { color: '#555', marginTop: 8, textAlign: 'center' },
  list: {
    padding: 16,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#eee',
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  meta: {
    color: '#666',
    marginBottom: 2,
  },
  metaLabel: {
    color: '#444',
    fontWeight: '600',
  },
  boxOffice: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
    color: PRIMARY,
    fontWeight: 'bold',
  },
  boxOfficeLabel: {
    color: '#a00',
    fontWeight: 'bold',
  },
});
