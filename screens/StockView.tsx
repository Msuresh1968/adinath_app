import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMasterData } from "../slice/master.slice";
import { Text, Button, SegmentedButtons } from "react-native-paper";
import Stock from "./Stock/Stock";
import Master from "./Master/Master";
import Background from "../components/Background";

const StockViewer = () => {

    const [selectedTab, setSelectedTab] = useState('search')
  

  return (
    <Background>

    <View style={{ flex: 1, padding: 10 }}>
      {/* Top Segmented Button Switcher */}
      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        style={{ marginBottom: 15 }}
        buttons={[
            { value: "search", label: "Search" },
            { value: "stock", label: "Stock" },
        ]}
        />

      {selectedTab === "search" ? (
          <Master />
        ) : (
            // <View style={styles.card}>
            //   <Text style={styles.title}>Stock Viewer</Text>
            //   {/* Replace with your StockViewer component */}
            //   <Text>Here your stock data will appear</Text>
            // </View>
            <Stock />
        )}
    </View>
        </Background>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    padding: 7,
    backgroundColor: "#E8F2FC",
    borderRadius: 8,
    margin: 3,
  },
  itemSelected: {
    backgroundColor: "#007bff",
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  labelSelected: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default StockViewer;
