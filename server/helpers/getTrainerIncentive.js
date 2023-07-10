
/**
 * @param {number} ato
 * @param {number} rank
 * @returns {number} trainerIncentive in Rs.
 */
const getTrainerIncentive = (rank, ato) => {
  ato = parseInt(ato);
  rank = parseInt(rank);
  if(!ato || !rank) 
    throw new Error('affliate turnover or rank not found')

  if(rank < 8 || rank > 15) return 0;
  
  return (ato * (2 / 100))
}

export default getTrainerIncentive

