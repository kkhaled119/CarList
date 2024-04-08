import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import ShoppingItem from "./components/ShoppingItem";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "./firebase/index";

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async () => {
    if (!title.trim()) {
      console.error("Title is empty");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title.trim(),
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle(""); // Clear the input after adding the item
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    const tempList = [];
    querySnapshot.forEach((doc) => {
      tempList.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setShoppingList(tempList);
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const deleteShoopingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItems}>{shoppingList.length}</Text>
        <TouchableOpacity onPress={deleteShoopingList}>
          <AntDesign name="delete" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator />
      )}

      <TextInput
        placeholder="Enter Shopping item "
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    flex: 1,
  },
  noOfItems: {
    fontSize: 30,
    fontWeight: "400",
    marginRight: 20,
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 30,
    marginTop: "auto",
  },
});
