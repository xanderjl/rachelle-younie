export const formatTime = (seconds: number): string => {
  const timeArray = [
    Math.floor(seconds / 60), // mins
    Math.floor(seconds % 60) // remaining secs
  ]
  const stringArray = timeArray.map(time => time.toString())
  const formattedString = stringArray
    .map(x => (x.length === 1 ? `0${x}` : x))
    .join(':')

  return formattedString
}
