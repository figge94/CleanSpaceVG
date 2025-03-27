// utils/tipUtils.js
import allTips from "../data/TipsData";

/**
 * Returnerar ett slumpmässigt tips ur listan
 */
export function getRandomTipFromList() {
  return allTips[Math.floor(Math.random() * allTips.length)];
}
