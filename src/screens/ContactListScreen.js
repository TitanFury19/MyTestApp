import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContactListHook } from "../hooks/useContatListHooks";
import ContactResponse from "../mock/contact-response.json";

export const ContactListScreen = ({ navigation }) => {
  const { contact, isLoading, error, setSearch, search } = useContactListHook();

  if (error) return <Text>Error en la llamada del servicio</Text>;

  const ListFooterComponent = () => {
    if (!isLoading) return null;
    return <ActivityIndicator color={"blue"} />;
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <TextInput
          onChangeText={setSearch}
          value={search}
          placeholder="filtrar contacto"
        />
      </View>

      <FlatList
        data={contact}
        windowSize={5}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListEmptyComponent={
          <View>
            <Text>No hay contactos</Text>
          </View>
        }
        ListFooterComponent={ListFooterComponent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
