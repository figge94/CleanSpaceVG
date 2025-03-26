// styles/AllStyles.js
import { StyleSheet } from "react-native";
import { shadow } from "./utilities";

// Global Styles
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
    ...shadow
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
  introText: {
    fontSize: 18
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
    shadowRadius: 5,
    ...shadow
  },
  profileImage: {
    width: 180,
    height: 180,
    marginBottom: 15,
    elevation: 5,
    borderRadius: 90,

    justifyContent: "space-around",
    alignSelf: "center",
    ...shadow
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
    borderRadius: 10,
    marginTop: 15,
    width: "90%",
    justifyContent: "center",
    ...shadow
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    textTransform: "uppercase",
    textAlign: "center",
    color: "white"
  },
  backButton: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: "white",
    justifyContent: "center",
    textTransform: "uppercase"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center"
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#007AFF",
    ...shadow
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },
  favoriteButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center"
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 50,
    padding: 18,
    borderRadius: 50,

    backgroundColor: "#222",
    ...shadow
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

    marginVertical: 8,
    ...shadow
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

export const statisticStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start"
  },
  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 6
  },
  card: {
    minWidth: "45%",
    margin: 6,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    ...shadow
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  statValue: {
    fontSize: 18,
    color: "#444"
  }
});

export const tipsStyles = StyleSheet.create({
  categoryScroll: {
    paddingVertical: 1,
    paddingHorizontal: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 2,
    backgroundColor: "#ddd",
    elevation: 1
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: "bold"
  },

  featuredTipContainer: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 12
  },
  featuredTip: {
    padding: 20,
    borderRadius: 12,

    alignItems: "center",
    ...shadow
  },
  featuredTipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
  },
  featuredTipText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9
  },
  shuffleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3
  },
  shuffleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#fff"
  },
  tipCard: {
    padding: 14,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    ...shadow
  },
  tipCardExpanded: {
    minHeight: 100
  },
  tipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  tipText: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9
  },
  content: {
    paddingBottom: 20
  }
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  username: {
    fontSize: 24,
    fontWeight: "bold"
  },
  email: {
    fontSize: 16,
    opacity: 0.7
  },
  settingsContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%"
  },
  settingsHeader: {
    fontSize: 24,
    fontWeight: "bold"
  }
});

export const detailStyles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20
  },
  detailsCard: {
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    ...shadow
  },
  noteContainer: {
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    elevation: 3
  },
  notes: {
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.85,
    flexShrink: 1,
    padding: 15,
    borderRadius: 10
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  }
});
