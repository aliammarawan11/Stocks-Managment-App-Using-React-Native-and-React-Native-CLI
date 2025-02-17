import {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';

const CreateScreen = ({data, setdata}) => {
  const [itemName, setitemName] = useState('');
  const [stockAmount, setstockAmount] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const [editItemId, seteditItemId] = useState(null);
  const [error, setError] = useState({name: '', stock: ''});

  const handleAddItem = () => {
    if (!validateInputs()) return;

    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: Number(stockAmount),
    };

    setdata([...data, newItem]);
    resetForm();
  };

  const handleDeleteItem = id => {
    setdata(data.filter(item => item.id !== id));
  };

  const handleEditItem = item => {
    setisEdit(true);
    setitemName(item.name);
    setstockAmount(String(item.stock));
    seteditItemId(item.id);
  };

  const handleUpdateItem = () => {
    if (!validateInputs()) return;

    setdata(
      data.map(item =>
        item.id === editItemId
          ? {...item, name: itemName, stock: Number(stockAmount)}
          : item,
      ),
    );
    resetForm();
  };

  const validateInputs = () => {
    let isValid = true;
    let nameError = '';
    let stockError = '';

    if (!/^[A-Za-z\s]+$/.test(itemName)) {
      nameError = 'Item name must only contain letters.';
      isValid = false;
    }
    if (!/^\d+$/.test(stockAmount)) {
      stockError = 'Stock must be a valid number.';
      isValid = false;
    }

    setError({name: nameError, stock: stockError});
    return isValid;
  };

  const resetForm = () => {
    setitemName('');
    setstockAmount('');
    setisEdit(false);
    seteditItemId(null);
    setError({name: '', stock: ''});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter an item name..."
        placeholderTextColor="#999"
        style={[styles.input, error.name ? styles.errorInput : null]}
        value={itemName}
        onChangeText={text => setitemName(text)}
      />
      {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}

      <TextInput
        placeholder="Enter stock amount..."
        placeholderTextColor="#999"
        style={[styles.input, error.stock ? styles.errorInput : null]}
        value={stockAmount}
        keyboardType="numeric"
        onChangeText={text => setstockAmount(text)}
      />
      {error.stock ? <Text style={styles.errorText}>{error.stock}</Text> : null}

      <Pressable
        style={styles.addButton}
        onPress={() => (isEdit ? handleUpdateItem() : handleAddItem())}>
        <Text style={styles.buttonText}>
          {isEdit ? 'EDIT ITEM IN STOCK' : 'ADD ITEM IN STOCK'}
        </Text>
      </Pressable>

      <View style={{marginTop: 10}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>All Items in the stock</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF'},
              ]}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={{flexDirection: 'row', gap: 20}}>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable onPress={() => handleEditItem(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteItem(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{gap: 10}}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#CABFEEFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontWeight: '400',
    fontSize: 15,
  },
});
