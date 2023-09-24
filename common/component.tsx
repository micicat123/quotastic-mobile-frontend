import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { customStyles } from '../config/theme.config';

const CreateCardFromQuote = ({ quote, image }) => (
  <View style={styles.card}>
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name={'chevron-up'} size={25} />
      <Text style={customStyles.body}>{quote.upvotes}</Text>
      <Icon name={'chevron-down'} size={25} />
    </View>
    <View style={{ justifyContent: 'space-between' }}>
      <Text style={[customStyles.h5, { paddingRight: 50, paddingBottom: 21 }]}>
        {quote.quote}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
        <Text style={customStyles.caption}>
          {quote.user.first_name} {quote.user.last_name}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 21,
    marginBottom: 18,
    borderRadius: 16,
    width: '100%',
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default CreateCardFromQuote;