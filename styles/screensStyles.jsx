// styles/screensStyles.js
import { StyleSheet } from "react-native";

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center"
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "center"
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
    elevation: 3,
    backgroundColor: "#28A745"
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#fff"
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
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
