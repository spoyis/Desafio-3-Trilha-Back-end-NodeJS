import AddressInterface from "../src/modules/user/AddressInterface"
import UserInterface from "../src/modules/user/UserInterface"
import CarInterface from "../src/modules/car/CarInterface"
import ReserveInterface from "../src/modules/reserve/ReserveInterface"
import { ObjectId } from "mongoose"

export const validAddress : AddressInterface = {
  cep: 79006480,
  patio: 'Aduie Rezek',
  complement: 'casa 05',
  neighborhood:'vila bandeirante',
  locality: 'Campo Grande',
  uf: 'MS',
}

export const validUserRequest : any = {
  name: 'Leandro de Souza Oliveira',
  cpf: '501.110.431-15',
  birthDate: '1965-12-20',
  email: 'palmeirasnaotemmundial@corinthians.br',
  password: 'cassiodefesas2012',
  cep: "04813140",
  qualified: true
}

export const validUser : UserInterface = {
  name: 'Leandro de Souza Oliveira',
  cpf: '501.110.431-15',
  birthDate: new Date('1965-12-20'),
  email: 'palmeirasnaotemmundial@corinthians.br',
  password: 'cassiodefesas2012',
  address: {...validAddress},
  qualified: true
}

export const validCar: CarInterface = {
  model : "Honda Civic",
  color: "black",
  year: 2020,
  value_per_day : 50,
  accessories: [
    {
      description: "Air coditioner"
    },
    {
      description: "parking camera"
    }
  ],
  number_of_passengers: 4
}


export const DatabaseUserQualified : UserInterface = {
  name: "Irmão Lazaro",
  cpf: "815.179.880-71",
  birthDate: new Date("1965-12-20"),
  email: "analistadesistemas@corinthians.br",
  password: "tecnico",
  address : {...validAddress},
  qualified: true
}

export const DatabaseUser = DatabaseUserQualified;

export const DatabaseUserNotQualified : UserInterface = {
  name : 'Roger Guedes',
  cpf : '706.193.330-57',
  birthDate : new Date(),
  email : 'camisa123eramelhor@corinthians.com',
  password: 'minoxidil',
  address: {...validAddress},
  qualified : false
}

export const DatabaseCar : CarInterface = {
  model : "VW Gol",
  color: "white",
  year: 2023,
  value_per_day : 75,
  accessories: [
    {
      description: "Air coditioner"
    },
    {
      description: "parking camera"
    }
  ],
  number_of_passengers: 4

}

export const validDBReservation = (userId: ObjectId, car : any) => {
  return {
    start_date : "2023-05-25",
    end_date: "2023-05-30",
    id_car: car.id,
    id_user: userId,
    final_value: car.value_per_day * 5
  }
}

export const validFakeReservation = (userId: ObjectId, car : any) => {
  return {
    start_date: "2023-03-25",
    end_date: "2023-03-30",
    id_car: car.id,
    id_user: userId,
    final_value: car.value_per_day * 5
  }
}

export const validReservationRequest = (userId: ObjectId, carId : ObjectId) => {
  return {
    start_date : "2023-04-25",
    end_date: "2023-04-30",
    id_car: carId,
    id_user: userId,
  }
}