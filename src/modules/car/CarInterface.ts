export default interface CarInterface{
  model: string,
  color: string,
  year: number,
  value_per_day: number,
  accessories: Array<string>,
  number_of_passengers: number
}