/**
 * @param {number} level - level number
 * @returns number - incentive/commission %
*/
export const getIncentive = (level) => {
  level = parseInt(level);
  let incentive;

  switch (level) {
    case 1:
      incentive = 20;
      break;
    case 2:
      incentive = 6;
      break;
    case 3:
      incentive = 3;
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      incentive = 2;
      break;
    case 8:
      incentive = 1.5;
      break;
    case 9:
    case 10:
    case 11:
    case 12:
      incentive = 1;
      break;
    default:
      incentive = 0;
  }

  return incentive;
}


/**
 * @param {number} level - level number
 * @param {number} members - members of that level
 * @returns boolean - level wise rank is valid or not
*/
export function isRankValid(level, members) {
  level = parseInt(level) || 0;
  const requiredMembers = 2 ** level;

  return members >= requiredMembers;
}


/**
 * @param {number} rank - rank number
 * @returns rank rewards
 */
export const getRankRewards = (rank = 1) => {
  rank = !rank ? 1 : rank;
  if (rank < 5 || rank > 15) return null;

  const rewardsMap = [
    "Tour & Training",
    "Android Mobile (min Rs. 15, 000)",
    "Two Wheeler (D.P - Rs. 30, 000)",
    "Four Wheeler (D.P - Rs. 1, 00, 000)",
    "National Tour",
    "International Tour",
    "0.25% CASH REWARDS",
    "0.25% CASH REWARDS",
    "0.25% CASH REWARDS",
    "0.15% CASH REWARDS",
    "0.10% CASH REWARDS"
  ]

  return rewardsMap[rank - 5]
}
