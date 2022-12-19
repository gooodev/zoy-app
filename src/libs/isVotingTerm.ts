export const isVotingTerm = () => {
  const dateStr = process.env.NEXT_PUBLIC_VOTING_END_DATE
  if (dateStr == null || typeof dateStr !== 'string') {
    return false
  }
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return false
  }
  return Date.now() <= date.getTime()
}
