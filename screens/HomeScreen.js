import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassCircleIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categorias from "../components/Categorias";
import FeaturedRow from "../components/FeaturedRow";

const styles = {
  postsList:
    "flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3",
  container: "max-w-7xl flex-1",
  main: "flex flex-col justify-between md:flex-row",
  wrapper: "mx-auto w-full",
};

const HomeScreen = () => {
  /*const { featuredCategories, setFeaturedCategories } = useState([]);*/

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-0">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-x5">
            Envoyer maintenant!
          </Text>

          <Text className="font-bold text-xl">
            Emplacement réel <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-md">
          <MagnifyingGlassCircleIcon size={20} color="gray" />
          <TextInput placeholder="Buscar Casos" keyboardType="default" />
        </View>
        <AdjustmentsHorizontalIcon size={20} color="gray" />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBotton: 100,
        }}
      >
        {/* Categorias */}
        <Categorias />

        {/* featured Rows */}

        {/* Tasty Discounts */}
        <FeaturedRow
          id="124"
          title="Featured"
          description="Cuyagua"
          featuredCategory="featured"
        />
        {/* Offers near you */}
        <FeaturedRow
          id="123"
          title="Offerts near you"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
        <FeaturedRow
          id="123"
          title="Offerts near you"
          description="Paid placements from our partners"
          featuredCategory="featured"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
