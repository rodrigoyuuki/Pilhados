import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import TabBar from "../../../components/tabBar";
import Drawer from "../../../components/drawer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export default function Dicas() {
  const router = useRouter();
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [listaDicas, setListaDicas] = useState([]);

  function infoDicas(doc) {
    const data = doc.data();
    return {
      id: doc.id,
      description: data.description,
      image: data.image,
      title: data.title,
      sectionTitle: Array.isArray(data.section?.sectionTitle) ? data.section.sectionTitle : [],
      sectionText: Array.isArray(data.section?.sectionText) ? data.section.sectionText : [],
    };
  }

  async function getDados() {
    const dicas = [];
    try {
      const docRef = collection(db, "dicas");
      const snapshot = await getDocs(docRef);

      snapshot.forEach((doc) => {
        const dica = infoDicas(doc);
        dicas.push(dica);
      });
      setListaDicas(dicas);
    } catch (err) {
      console.error("Erro ao carregar notícias:", err);
    }
  }
  useEffect(() => {
    getDados();
  }, []);

  const toggleDrawer = () => {
    if (!isDrawerVisible) {
      setShouldRenderDrawer(true);
    }
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="bulb-outline" size={60} color="#148311" />
          <Text style={styles.headerTitle}>Dicas</Text>
        </View>

        {listaDicas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => router.push({
              pathname: '/dica',
              params: {
                id: item.id,
                description: item.description,
                image: item.image,
                title: item.title,
                sectionTitle: JSON.stringify(item.sectionTitle),
                sectionText: JSON.stringify(item.sectionText),
              }
            })}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => router.push({
                pathname: '/dica',
                params: {
                  id: item.id,
                  description: item.description,
                  image: item.image,
                  title: item.title,
                  sectionTitle: JSON.stringify(item.sectionTitle),
                  sectionText: JSON.stringify(item.sectionText),
                }
              })}>
              <Ionicons name="chevron-forward" size={24} color="#b6e388" />
            </TouchableOpacity>
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
    </View>
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
    fontSize: 20,
    color: "#148311",
    marginTop: 5,
    fontFamily: 'PoppinsBold'
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
    width: 90,
    height: 100,
    borderRadius: 30,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    marginRight: 10
  },
  cardTitle: {
    fontSize: 15.5,
    color: "#0b4d0b",
    marginBottom: 5,
    fontFamily: 'PoppinsBold',
  },
  cardDescription: {
    fontSize: 11,
    color: "#2e2e2e",
    fontFamily: 'PoppinsRegular',
  },
  cardButton: {
    backgroundColor: '#f2ffcb',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 33,
    height: 33
  },
});