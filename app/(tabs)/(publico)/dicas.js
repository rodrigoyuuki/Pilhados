import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import TabBar from "../../../components/tabBar";
import Drawer from "../../../components/drawer";

export default function Dicas() {
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    if (!isDrawerVisible) {
      setShouldRenderDrawer(true);
    }
    setIsDrawerVisible(!isDrawerVisible);
  };

  const dicas = [
    {
      id: 1,
      title: "Descarte de pilhas",
      description:
        "Você sabia que o descarte incorreto de pilhas pode liberar metais pesados no solo? Aprenda a fazer a separação correta desses resíduos.",
      image:
        "https://autossustentavel.com/wp-content/uploads/2018/11/battery-1930833_1920-Copia-1.jpg",
      route: "dica",
    },
    {
      id: 2,
      title: "Comece a mudança!",
      description:
        "Comece a mudança ecológica em casa com pequenos passos, como separar o lixo reciclável e economizar água e energia!",
      image:
        "https://sustainablefuturesacademy.org/images/566cca26f35d4d76c5ece8793261fa3f.jpg",
      route: "/dicas/mudanca",
    },
    {
      id: 3,
      title: "Plante uma horta em casa",
      description:
        "Mesmo em espaços pequenos, é possível ter uma horta de temperos e chás. Isso garante alimentos mais saudáveis!",
      image:
        "https://www.theepochtimes.com/_next/image?url=https://img.theepochtimes.com/assets/uploads/2025/07/22/id5890973-shutterstock_2150765615-700x700.jpg&w=1200&q=75",
      route: "/dicas/horta",
    },
    {
      id: 4,
      title: "Descarte de aparelhos",
      description:
        "Separe eletrodomésticos quebrados para levar a pontos de coleta. Assim você evita danos ambientais e ainda ajuda na reciclagem.",
      image:
        "https://blog.superbid.net/wp-content/uploads/2024/09/tipos-de-leiloes-de-sucata-1.jpg",
      route: "/dicas/aparelhos",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="bulb-outline" size={60} color="#148311" />
          <Text style={styles.headerTitle}>Dicas</Text>
        </View>

        {dicas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push(item.route)}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#148311" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TabBar />
      {shouldRenderDrawer && (
        <Drawer
          isVisible={isDrawerVisible}
          onClose={toggleDrawer}
          setShouldRenderDrawer={setShouldRenderDrawer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaffd5",
  },
  scrollContent: {
    paddingBottom: 120,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#148311",
    marginTop: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#b6e388",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: "90%",
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0b4d0b",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 13,
    color: "#2e2e2e",
  },
});
