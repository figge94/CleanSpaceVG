// styles/AllStyles.js

import { StyleSheet } from "react-native";

// 🔵 Global Styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "#c7c7ff",
    justifyContent: "center"
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
    opacity: 0.8,
    marginTop: 100
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  text: {
    fontSize: 14
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center"
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  input: {
    backgroundColor: "#ededed",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    width: "99%"
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  settingsHeader: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export const tagStyles = StyleSheet.create({
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginRight: 3
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "lowercase"
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 5
  }
});

export const imageStyles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 250
  },
  wardrobeImage: {
    position: "absolute",
    top: 0,
    height: 200,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  shadowContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
    elevation: 5, // Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  profileImage: {
    width: 180,
    height: 180,
    marginBottom: 15,
    elevation: 5,
    borderRadius: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "space-around",
    alignSelf: "center"
  },
  introImage: {
    width: 300,
    height: 490
  }
});

export const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 15,
    width: "90%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    textTransform: "uppercase",
    textAlign: "center",
    color: "white"
  },
  backButton: {
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: "center",
    color: "white",
    justifyContent: "center",
    textTransform: "uppercase"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center"
  }
});

export const cardStyles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    boxShadow: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginVertical: 8
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "left"
  },
  text: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "left"
  },
  arrowIcon: {
    marginLeft: 10
  }
});
