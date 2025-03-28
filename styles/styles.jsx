// styles/AllStyles.js
import { StyleSheet } from "react-native";
import {
  shadow,
  titleText,
  subTitleText,
  sectionTitleText,
  baseButton,
  buttonText,
  cardBase,
  cardTitle,
  cardText,
  imageShadow,
  center,
  circularImage,
  noteText,
  rounded,
  tipText,
  tipTitleText
} from "./utilities";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
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
  header: {
    paddingVertical: 15,
    alignItems: "center"
  },
  notesBox: {
    padding: 10,
    borderRadius: 6
  },
  backButtonWrapper: {
    backgroundColor: "theme", // sätts dynamiskt
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    ...titleText,
    marginBottom: 15
  },
  subTitle: {
    ...subTitleText,
    marginTop: 15,
    marginBottom: 10
  },
  sectionTitle: {
    ...sectionTitleText,
    marginBottom: 4
  },
  text: {
    fontSize: 16
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  email: {
    fontSize: 16,
    textAlign: "center"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  searchInput: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1
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
  },
  introContainer: {
    paddingBottom: 50
  },
  addModal: {
    container: {
      maxHeight: "90%",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center"
    },
    formSection: {
      marginTop: 5,
      color: "inherit"
    },
    conditionRow: {
      flexDirection: "row",
      marginBottom: 10
    },
    conditionButton: {
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 10
    },
    noteInput: {
      height: 70
    },
    buttonGroup: {
      marginTop: 10
    }
  },
  editModal: {
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      width: "90%",
      maxHeight: "80%",
      padding: 20,
      borderRadius: 10
    },
    button: {
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10
    },
    cancelButton: {
      backgroundColor: "#888"
    },
    cancelText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    },
    saveText: {
      fontSize: 16,
      fontWeight: "bold"
    },
    noteInput: {
      height: 80
    }
  },
  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20
  },
  header: {
    paddingVertical: 15,
    alignItems: "center"
  },
  detailsCard: {
    padding: 14,
    marginTop: 15,
    ...rounded(),
    ...shadow
  },
  noteContainer: {
    padding: 12,
    marginTop: 15,
    marginBottom: 20,
    ...rounded(),
    ...shadow
  },
  notesBox: {
    padding: 10,
    borderRadius: 6
  },
  notes: {
    ...noteText,
    flexShrink: 1,
    padding: 15,
    ...rounded()
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  featuredTipContainer: {
    marginVertical: 10,
    padding: 15,
    ...rounded()
  },
  featuredTip: {
    padding: 20,
    ...rounded(),

    alignItems: "center",
    ...shadow
  },
  featuredTipTitle: {
    ...tipTitleText
  },
  featuredTipText: {
    ...tipText
  },
  shuffleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...rounded(),
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
    ...rounded(),
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

export const theme = StyleSheet.create({
  background: "#ece3df",
  text: "#000",
  cardBackground: "#fff",
  buttonBackground: "#B28C7B",
  buttonText: "#fff",
  borderColor: "#d9c7bf",
  headerText: "#fff",
  activeButtonBackground: "#A47864",
  notActiveButtonBackground: "#d9c7bf",
  tagBackground: "#AC9C95"
});

export const buttonStyles = StyleSheet.create({
  button: {
    ...baseButton
  },
  buttonText: {
    ...buttonText,
    marginLeft: 10,
    color: "white"
  },
  backButton: {
    ...buttonText,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: "white"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center"
  },
  toggleButton: {
    ...baseButton,
    alignSelf: "stretch"
  },
  toggleButtonText: {
    ...buttonText,
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
    marginBottom: 250,
    ...center
  },
  headerImage: {
    position: "absolute",
    top: 0,
    height: 200,
    width: "100%",
    resizeMode: "cover",
    ...imageShadow
  },
  shadowContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.3)",
    ...imageShadow
  },
  profileImage: {
    ...circularImage(),
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

export const cardStyles = StyleSheet.create({
  card: {
    ...cardBase
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  title: {
    ...cardTitle
  },
  text: {
    ...cardText
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

    marginBottom: 5,
    textAlign: "center"
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
    ...rounded(20),
    marginHorizontal: 2,
    backgroundColor: "#ddd",
    elevation: 1
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: "bold"
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
  }
});
