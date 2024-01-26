export const stringToDateFormat = (stringDate:string) => {
  return new Date((stringDate).replaceAll('/', '-'))
}