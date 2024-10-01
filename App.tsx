import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Modal, Image, ImageBackground, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; 
import { MenuItem } from './models/MenuItem'; 

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Grilled Salmon', description: 'Served with a lemon butter sauce.', course: 'main', price: 250 },
    { id: '2', name: 'Chocolate Lava Cake', description: 'Decadent dessert with a molten center.', course: 'dessert', price: 90 },
    { id: '3', name: 'Caesar Salad', description: 'Classic Caesar with croutons.', course: 'starter', price: 50 },
    { id: '4', name: 'Pasta Primavera', description: 'Fresh seasonal vegetables.', course: 'main', price: 180 },
    { id: '5', name: 'Tiramisu', description: 'Italian coffee-flavored dessert.', course: 'dessert', price: 60 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    id: '', name: '', description: '', course: 'starter', price: 0
  });

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const addMenuItem = () => {
    setMenuItems([...menuItems, { ...newMenuItem, id: Date.now().toString() }]);
    setModalVisible(false);
    setNewMenuItem({ id: '', name: '', description: '', course: 'starter', price: 0 });
  };

  const filteredMenuItems = selectedCourse 
    ? menuItems.filter(item => item.course === selectedCourse)
    : [];

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>{item.name} - R{item.price}</Text>
      <Text style={styles.menuDescription}>{item.description}</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={require('./img/background.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        <Image 
          source={require('./img/logo.png')}  
          style={styles.logo} 
          resizeMode="contain"
        />

        <Text style={styles.totalMenuText}>Total Menu Items: {menuItems.length}</Text>
        
       
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedCourse(value);
          }}
          items={[
            
            { label: 'Starters', value: 'starter' },
            { label: 'Mains', value: 'main' },
            { label: 'Desserts', value: 'dessert' },
          ]}
          style={pickerSelectStyles}
        />

        
        {selectedCourse && (
          <Text style={styles.courseHeader}>{selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)}:</Text>
        )}

        <FlatList 
          data={filteredMenuItems} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
          contentContainerStyle={styles.menuList}
        />
        
        <Button title="Add Menu Item" onPress={() => setModalVisible(true)} />
        
        {/* Modal for Adding Menu Item */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalView}>
            <TextInput 
              placeholder="Dish Name"
              style={styles.input}
              value={newMenuItem.name}
              onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
            />
            <TextInput 
              placeholder="Description"
              style={styles.input}
              value={newMenuItem.description}
              onChangeText={(text) => setNewMenuItem({ ...newMenuItem, description: text })}
            />
            <TextInput 
              placeholder="Price"
              style={styles.input}
              keyboardType="numeric"
              value={newMenuItem.price.toString()}
              onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: parseFloat(text) })}
            />

          
            <RNPickerSelect
              onValueChange={(value) => setNewMenuItem({ ...newMenuItem, course: value })}
              items={[
                { label: 'Starter', value: 'starter' },
                { label: 'Main', value: 'main' },
                { label: 'Dessert', value: 'dessert' },
              ]}
              value={newMenuItem.course}
              style={pickerSelectStyles}
            />

            <Button title="Add" onPress={addMenuItem} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  totalMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  courseHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  menuItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: '90%',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#555',
  },
  menuList: {
    paddingHorizontal: 10,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    marginHorizontal: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginVertical: 10,
    width: '100%',
    padding: 8,
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
});

export default HomeScreen;
