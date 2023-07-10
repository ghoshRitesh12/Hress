/**
 * @param {number} level - level number
 * @returns number - incentive/commission %
 */
export const getIncentive = (level) => {
  level = parseInt(level);
  let incentive;
  
  switch(level) {
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
      incentive = 2;
      break;
    case 5: 
    case 6:
    case 7:
    case 8:
    case 9:
      incentive = 1;
      break;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      incentive = 0.5;
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
export const isRankValid = (level, members) => {
  level = parseInt(level) || 0;
  let requiredMembers, rankValid = false;

  if(level < 11) 
    requiredMembers = 2 ** level;
  else if(level > 11 && level < 15) 
    requiredMembers = Math.floor(2 ** level / 1000) * 1000;
  else 
    requiredMembers = (Math.floor(2 ** level / 1000) * 1000) - 2000;

  if(members >= requiredMembers )
    rankValid = true;

  return rankValid;
}


/**
 * @param {number} rank - rank number
 * @returns rank rewards
 */
export const getRankRewards = (rank = 1) => {
  rank = !rank ? 1 : rank;
  if(rank < 5 || rank > 15) return null;

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
