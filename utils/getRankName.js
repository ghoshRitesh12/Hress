const getRankName = (rank = 1) => {
  rank = rank ? rank : 1
  const rankNames = [
    "N/A",
    "One (1)",
    "Two (2)",
    "Three (3)",
    "Four (4)",
    "Star Trader (5)",
    "Silver Trader (6)",
    "Gold Trader (7)",
    "Platinum Trader (8)",
    "Ruby Trader (9)",
    "Diamond Trader (10)",
    "Blue Diamond Trader (11)",
    "Gold Diamond Trader (12)",
    "Royal Diamond Trader (13)",
    "Crown Diamond Trader (14)",
    "Crown Ambassador (15)"
  ]

  return (rank < 1 || rank > 15) ? rankNames[0] : rankNames[rank]
}

export default getRankName;
