const OPTION = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

const TIME_OPTION = {
  hour: '2-digit',
  minute: '2-digit'
}

export const formatDate = (date, option = OPTION) => new Date(date).toLocaleDateString('en-GB', option)

export const formatTime = (time, option = TIME_OPTION) => new Date(time).toLocaleTimeString('en-GB', option)

export const getIncrementedDate = (increment, date = new Date()) => {
  date.setDate(date.getDate() + increment)
  return setStartOfDay(date)
}

export const setStartOfDay = date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}