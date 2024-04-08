import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { db, doc, updateDoc, deleteDoc } from "../firebase/index";

//shopping object
/*
id
title
isChecked


*/

const ShoppingItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const updateIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(shoppingRef, {
      isChecked: isChecked,
    });
  };

  const deleteShooping = async () => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingList();
  };

  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);

  return (
    <View style={styles.container}>
      {/*Cheacked Icon */}

      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <AntDesign name="checkcircle" size={24} color="black" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="black" />
        )}
      </TouchableOpacity>

      {/*Shooping text */}

      <Text style={styles.title}>{props.title}</Text>

      {/*Delete Button */}
      <TouchableOpacity onPress={deleteShooping}>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});
