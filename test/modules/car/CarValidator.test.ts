import { invalid } from "joi"
import CarInterface from "../../../src/modules/car/CarInterface"
import CarValidator from "../../../src/modules/car/CarValidator"

describe('CarValidator test suite', () =>{

  const validCar: CarInterface = {
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

  let car: CarInterface;

  beforeEach(()=>{
    car = {...validCar};
  });

  it('Should return the car object, if the given inputs are valid', async ()=>{
    const result1 = await CarValidator.validatePOST(car);
    expect(result1).toEqual(car);
    const result2 = await CarValidator.validateUPDATE(car);
    expect(result2).toEqual(car);
  });

  describe('Returns an error when', () =>{

    describe('Any of the required car inputs are missing', () =>{
      it.each([
        {input:'model'},
        {input:'color'},
        {input:'year'},
        {input:'value_per_day'},
        {input:'accessories'},
        {input:'address'},
        {input:'number_of_passengers'}
      ])(' - $input is missing',  async ({input})=>{
        (car as any)[input] = undefined;
        await expect(CarValidator.validatePOST(car)).rejects.toThrow();
      });
    });

    it('the accessories array is empty', async ()=>{
      car.accessories = [];
      await expect(CarValidator.validatePOST(car)).rejects.toThrow();
    })

    it('the accessories array has duplicate entries', async ()=>{
      const accessory = 'air conditioning';
      car.accessories = [{description: accessory}, {description: accessory}];
      await expect(CarValidator.validatePOST(car)).rejects.toThrow();
    })

    it(`the car was fabricated before ${CarValidator.FABRICATION_LOWER_BOUND}`, async ()=>{
      car.year = CarValidator.FABRICATION_LOWER_BOUND - 1;
      await expect(CarValidator.validatePOST(car)).rejects.toThrow();
    })

    it(`the car was fabricated after ${CarValidator.FABRICATION_UPPER_BOUND}`, async ()=>{
      car.year = CarValidator.FABRICATION_UPPER_BOUND + 1;
      await expect(CarValidator.validatePOST(car)).rejects.toThrow();
    })
  });

});