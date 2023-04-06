import AddressInterface from "./AddressInterface";

export default interface UserInterface{
  name: string,
  cpf: string,
  birthDate: Date,
  email: string,
  password: string,
  address: AddressInterface,
  qualified: boolean
}