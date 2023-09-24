import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import MostLikedQuotes from '../../components/home_page/mostLikedQuotes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAsyncStorageValues = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        const email = await AsyncStorage.getItem('email');
        const userId = await AsyncStorage.getItem('userId');

        console.log('jwt:', jwt);
        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        console.log('email:', email);
        console.log('userId:', userId);

        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
        setIsLoggedIn(false);
      }
    };

    fetchAsyncStorageValues();
  }, []);

  if (isLoggedIn) {
    return (
      <View>
        <Text>Logged in</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <View>
          <Text style={customStyles.h1}>
            Welcome {'\n'}to{' '}
            <Text style={{ color: Theme.lightColors.primary }}>Quotastic</Text>
          </Text>
          <Text style={[customStyles.h5, { marginTop: 18, marginBottom: 32 }]}>
            Quotastic is free online platform for you to explore the quips,
            quotes, and proverbs. Sign up and express yourself.
          </Text>
          <TouchableOpacity style={[customStyles.filledButton, { width: 137 }]}>
            <Link
              href='/login'
              style={[customStyles.buttonText, customStyles.body]}
            >
              <Text>Sign up</Text>
            </Link>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/hero.png')}
          style={{ width: '100%', resizeMode: 'contain', marginTop: 30 }}
        />

        <Text style={[customStyles.h4, { textAlign: 'center' }]}>
          Explore the{'\n'} world of {'\n'}fantastic quotes
        </Text>

        <MostLikedQuotes />
      </View>
    </ScrollView>
  );
}
