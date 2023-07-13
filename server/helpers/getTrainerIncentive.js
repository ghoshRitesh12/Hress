
/**
 * @param {number} ato
 * @param {number} rank
 * @returns {number} trainerIncentive in Rs.
 */
const getTrainerIncentive = (rank, ato) => {
  ato = parseInt(ato) ? ato : 0;
  rank = parseInt(rank);
  if(!rank) 
    throw new Error('rank not found')

  if(rank < 8 || rank > 15) return 0;
  
  return (ato * (2 / 100))
}

export default getTrainerIncentive

