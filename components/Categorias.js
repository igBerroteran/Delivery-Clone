import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CategoriaCard from "./CategoriaCard";

const Categorias = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-1"
      />
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-2"
      />
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-3"
      />
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-1"
      />
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-2"
      />
      <CategoriaCard
        imgUrl="https://links.papareact.com/gn7"
        title="Testing-3"
      />
    </ScrollView>
  );
};

export default Categorias;
