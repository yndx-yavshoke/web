import { Dimensions, Platform } from "react-native";

export const isDesktop = () => {
  console.log(Dimensions.get("window").width, Platform.OS);

  return Dimensions.get("window").width >= 1024 && Platform.OS === "web";
};
