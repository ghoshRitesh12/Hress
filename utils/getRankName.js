const getRankName = (rank = 1) => {
  rank = rank ? rank : 1
  const rankNames = [
    "N/A",
    "One(1)",
    "Runner (2)",
    "Bronze Trader (3)",
    "Silver Trader (4)",
    "Gold Trader (5)",
    "Platinum Trader (6)",
    "Emerald Trader (7)",
    "Saphire Trader (8)",
    "Ruby Trader (9)",
    "Diamond Trader (10)",
    "Black Diamond Trader (11)",
    "Blue Diamond Trader (12)",
    "Red Diamond Trader (13)",
    "Crown Trader (14)",
    "Crown Ambassador (15)",
  ]

  return (rank < 1 || rank > 15) ? rankNames[0] : rankNames[rank]
}

export default getRankName;
