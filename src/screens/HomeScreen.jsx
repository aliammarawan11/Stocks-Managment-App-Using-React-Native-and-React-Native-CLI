import {Pressable, StyleSheet, Text, View} from 'react-native';
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import {useState} from 'react';

const HomeScreen = () => {
  const [view, setview] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setview(0)}>
          <Text style={[styles.btnText, view === 0 ? {color: 'white'} : null]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setview(1)}>
          <Text style={[styles.btnText, view === 1 ? {color: 'white'} : null]}>
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setview(2)}>
          <Text style={[styles.btnText, view === 2 ? {color: 'white'} : null]}>
            Create Item
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems />}
      {view === 1 && <AllItems />}
      {view === 2 && <CreateScreen />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: 'green',
  },
  btnText: {
    color: 'green',
    fontSize: 12,
  },
});
