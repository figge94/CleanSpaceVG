// styles/utilities.js
export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 5
};

export const titleText = {
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center"
};

export const subTitleText = {
  ...titleText,
  fontSize: 24
};

export const sectionTitleText = {
  fontSize: 16,
  fontWeight: "bold"
};

export const tipTitleText = {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 8
};

export const tipText = {
  fontSize: 16,
  opacity: 0.9,
  textAlign: "center"
};

export const errorText = {
  fontSize: 18,
  color: "red",
  ...centeredText
};

export const noteText = {
  fontSize: 14,
  fontStyle: "italic",
  opacity: 0.85
};

export const centeredText = { textAlign: "center" };

export const leftAlignedText = {
  textAlign: "left"
};

export const baseButton = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop: 15,
  width: "100%",
  ...shadow
};

export const buttonText = {
  fontSize: 18,
  fontWeight: "bold",
  textTransform: "uppercase",
  ...centeredText
};

export const rounded = (radius = 12) => ({
  borderRadius: radius
});

export const cardBase = {
  width: "100%",
  padding: 16,
  marginVertical: 8,
  backgroundColor: "#fff",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  ...rounded(),
  ...shadow
};

export const cardTitle = {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 4,
  ...leftAlignedText
};

export const cardText = {
  fontSize: 16,
  opacity: 0.8,
  ...leftAlignedText
};

export const center = {
  justifyContent: "center",
  alignItems: "center"
};

export const imageShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 5
};

export const circularImage = (size = 180) => ({
  width: size,
  height: size,
  borderRadius: size / 2
});
