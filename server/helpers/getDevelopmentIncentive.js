
/**
 * @param {number} rank
 * @returns {number} developmentIncentive
 */
const getDevelopmentIncentive = (rank) => {
  rank = rank ? parseInt(rank) : 1;
  if(!rank) throw new Error('rank not found')

  switch(rank) {
    case 7:
    case 8:
    case 9:
    case 10:
      return 1;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return 0.5;
    default: 
      return 0;
  }
}

export default getDevelopmentIncentive
