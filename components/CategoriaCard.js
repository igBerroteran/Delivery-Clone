import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoriaCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2 rounded-md">
      <Image
        source={{
          uri: "https://links.papareact.com/gn7",
        }}
        className="h-20 w-20 rounded-sm"
      />
      <Text className="absolute botton-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriaCard;
