/**
 * 
 * @param {number} level 
 * @returns number
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
 * 
 * @param {number} level 
 * @param {number} members
 * @returns number
 */
export const getRank = (level, members) => {
  level = parseInt(level) || 1;
  let requiredMembers, rankNo = 1;

  if(level < 11) 
    requiredMembers = 2 ** level;
  else if(level > 11 && level < 15) 
    requiredMembers = Math.floor(2 ** level / 1000) * 1000;
  else 
    requiredMembers = (Math.floor(2 ** level / 1000) * 1000) - 2000;

  rankNo = ((level - 1) === 0) ? 1 : level - 1; // if valid
  if(members >= requiredMembers)
    rankNo = level ;

  return rankNo;
}

