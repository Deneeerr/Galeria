import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [imagens, setImagens] = useState([
    { id: "1", uri: "https://s3.amazonaws.com/assets-fluminense/uploads%2F1716935830074-53311817769_e9d34776fd_c.jpg", jogador: "Fábio" },
    { id: "2", uri: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2023/08/09/1930603597-fbl-libertadores-fluminense-argentinos-1.jpg", jogador: "Samuel Xavier" },
    { id: "3", uri: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2023/11/06/187494219-02-nino-zagueiro-do-flumnense-marcelo-goncalves-ffc.jpg", jogador: "Nino" },
    { id: "4", uri: "https://uploads.metroimg.com/wp-content/uploads/2023/12/21141023/Felipe-Melo-fluminense-1.jpg", jogador: "Felipe Melo" },
    { id: "5", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEN6hb1pkYKAZ_HDKLAotnHENcWrZtZqolXQ&s", jogador: "Marcelo" },
    { id: "6", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wF6m0kW8c-YJ45KU7KfC2tkhKp3spb1YiPixHsYNauS4JGAIYz2_Ffjo8FCwWjwiM08&usqp=CAU", jogador: "André" },
    { id: "7", uri: "https://image-service.onefootball.com/transform?w=280&h=210&dpr=2&image=https%3A%2F%2Fwww.saudacoestricolores.com%2Fwp-content%2Fuploads%2F2025%2F06%2F54555040354_bd6e61cc89_o.jpg", jogador: "Martinelli" },
    { id: "8", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-rM2ZhBwubyC3HicXa55n-aOZe6R6mRWhw&s", jogador: "Ganso" },
    { id: "9", uri: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/jhon-arias-fluminense-ldu-recopa-e1721395150887.jpg?w=1200&h=1200&crop=1", jogador: "Jhon Arias" },
    { id: "10", uri: "https://s2-ge.glbimg.com/gjGQS1WmPsZueJatm5Awtok14jo=/0x0:4082x2721/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/l/z/dYiVopSdalbHuS9dvUDQ/gettyimages-2221395234.jpg", jogador: "Keno" },
    { id: "11", uri: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/04/german-cano-fluminense-sul-americana-e1743595817470.webp?w=1000", jogador: "Cano" },
    { id: "12", uri: "https://s2-oglobo.glbimg.com/R9sC6bPSesVBR2fgf0JCG97v4CY=/0x0:3000x2000/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/I/y/nMYxAcTkeAngh8VBYBWA/107028283-rio-de-janeiro-brasil-22-05-2024-maracana-fluminense-enfrenta-o-sampaio-correa-esta.jpg", jogador: "John Kennedy" },
  ]);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [jogadorSelecionado, setJogadorSelecionado] = useState("");

  const abrirImagem = (uri, jogador) => {
    setImagemSelecionada(uri);
    setJogadorSelecionado(jogador);
  };

  const fecharImagem = () => {
    setImagemSelecionada(null);
    setJogadorSelecionado("");
  };

  const excluirImagem = (id) => {
    Alert.alert(
      "Excluir imagem",
      "Deseja realmente excluir esta imagem da galeria?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setImagens(imagens.filter((img) => img.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        index % 2 === 0 ? styles.cardLeft : styles.cardRight
      ]}
      onPress={() => abrirImagem(item.uri, item.jogador)}
      onLongPress={() => excluirImagem(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.uri }} style={styles.imagem} />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>👆 {item.jogador}</Text>
        <Text style={styles.overlayText}>👇 Segure para excluir</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#7B0323" barStyle="light-content" />
      
      {/* Header Tricolor */}
      <View style={styles.header}>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>FLUMINENSE</Text>
          <Text style={styles.subtitulo}>CAMPEÃO DA LIBERTADORES 2023</Text>
          <View style={styles.trofeuContainer}>
            <Text style={styles.trofeu}>🏆</Text>
          </View>
        </View>
        <Text style={styles.contador}>
          {imagens.length} jogador{imagens.length !== 1 ? 'es' : ''} heróis
        </Text>
      </View>

      {/* Galeria Tricolor */}
      <FlatList
        data={imagens}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.galeria}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal - Tela Cheia */}
      <Modal 
        visible={!!imagemSelecionada} 
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalFechar}
            onPress={fecharImagem}
          >
            <Text style={styles.modalTextoFechar}>✕</Text>
          </TouchableOpacity>
          
          {/* Nome do jogador no modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.jogadorNome}>{jogadorSelecionado}</Text>
          </View>
          
          <Image 
            source={{ uri: imagemSelecionada }} 
            style={styles.imagemFull} 
            resizeMode="contain"
          />
          
          <View style={styles.modalFooter}>
            <Text style={styles.modalInstrucao}>Herói do título! ⚪🟢🔴</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#7B0323",
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  tituloContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFD700",
    fontWeight: "600",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  trofeuContainer: {
    marginTop: 8,
  },
  trofeu: {
    fontSize: 28,
  },
  contador: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    fontStyle: "italic",
    marginTop: 5,
  },
  galeria: {
    padding: 12,
    backgroundColor: "#f0f0f0",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 18,
    backgroundColor: "#fff",
    shadowColor: "#7B0323",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(123, 3, 35, 0.1)",
  },
  cardLeft: {
    marginRight: 3,
  },
  cardRight: {
    marginLeft: 3,
  },
  imagem: {
    width: "100%",
    height: 190,
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(123, 3, 35, 0.85)",
    padding: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  overlayText: {
    color: "#FFD700",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(123, 3, 35, 0.98)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  jogadorNome: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    backgroundColor: "rgba(123, 3, 35, 0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  imagemFull: {
    width: "95%",
    height: "70%",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  modalFechar: {
    position: "absolute",
    top: 60,
    right: 25,
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextoFechar: {
    color: "#7B0323",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalFooter: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modalInstrucao: {
    color: "#FFD700",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});