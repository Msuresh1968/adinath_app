import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchMasterData } from "../../slice/master.slice";
import { Text, Button, SegmentedButtons } from "react-native-paper";
import Background from "../../components/Background";

const Master = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { masterListdata } = useSelector((state: RootState) => state.master);
  const { shapeList, colorList, clarityList, polishDt }: any = masterListdata;

  const [selectedTab, setSelectedTab] = useState("search");

  const [selected, setSelected] = useState<{
    shape: string[];
    color: string[];
    clarity: string[];
    polish: string[];
  }>({
    shape: [],
    color: [],
    clarity: [],
    polish: [],
  });

  useEffect(() => {
    dispatch(fetchMasterData());
  }, []);

  const toggleSelect = (key: keyof typeof selected, item: string) => {
    setSelected((prev) => {
      const exists = prev[key].includes(item);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((i) => i !== item) : [...prev[key], item],
      };
    });
  };

  const clearAll = () => {
    setSelected({
      shape: [],
      color: [],
      clarity: [],
      polish: [],
    });
  };

  const renderCard = (
    title: string,
    key: keyof typeof selected,
    data: string[],
    numColumns: number
  ) => (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isSelected = selected[key].includes(item);
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => toggleSelect(key, item)}
            >
              <Text style={[styles.label, isSelected && styles.labelSelected]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        nestedScrollEnabled
        style={{ maxHeight: 120 }} // vertical scroll inside card
      />
    </View>
  );

  return (
    <Background>    
        <ScrollView>
          <Button mode="outlined" onPress={clearAll} style={{ marginBottom: 12 }}>
            Clear All
          </Button>

          {renderCard("Shape", "shape", shapeList?.map((x: any) => x.SHAPE) || [], 3)}
          {renderCard("Color", "color", colorList?.map((x: any) => x.COLOR) || [], 5)}
          {renderCard("Clarity", "clarity", clarityList?.map((x: any) => x.CLARITY) || [], 5)}
          {renderCard("Polish", "polish", polishDt?.map((x: any) => x.PROCNM) || [], 4)}
       
        </ScrollView>
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

export default Master;
