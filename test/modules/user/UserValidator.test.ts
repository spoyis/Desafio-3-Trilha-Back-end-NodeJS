import { invalid } from "joi"
import AddressInterface from "../../../src/modules/user/AddressInterface"
import UserInterface from "../../../src/modules/user/UserInterface"
import UserValidator from "../../../src/modules/user/UserValidator"
import { validUser, validAddress } from "../objectInstances"

describe('UserValidator test suite', () =>{
  let user: UserInterface;

  beforeEach(()=>{
    user = {...validUser};
    user.address = {...validAddress}
  });

  it('Should return the user object, if the given inputs are valid', async ()=>{
    const result = await UserValidator.validate(user);
    expect(result).toEqual(user);

    user.cpf = '012.345.678-90'
    const result2 = await UserValidator.validate(user);
    expect(result2).toEqual(user);

    user.cpf = '027.973.761-02'
    const result3 = await UserValidator.validate(user);
    expect(result3).toEqual(user);
  });

  describe('Returns an error when', () =>{

    describe('Any of the required user inputs are missing', () =>{
      it.each([
        {input:'name'},
        {input:'cpf'},
        {input:'birthDate'},
        {input:'email'},
        {input:'password'},
        {input:'address'},
        {input:'qualified'}
      ])(' - $input is missing',  async ({input})=>{
        (user as any)[input] = undefined;
        await expect(UserValidator.validate(user)).rejects.toThrow();
      });
    });

    describe('Any of the required address inputs are missing', () =>{
      it.each([
        {input:'cep'},
        {input:'locality'},
        {input:'uf'}
      ])(' - $input is missing',  async ({input})=>{
        (user as any).address[input] = undefined;
        await expect(UserValidator.validate(user)).rejects.toThrow()
      });
    });

    const generateString = (NumberOfCharacters : number) =>{
        return 'a'.repeat(NumberOfCharacters);
    }

    describe('The password has', () =>{
      it.each([
        {input: generateString(UserValidator.PASSWORD_LOWER_BOUND - 1), description: "Less", boundary: "minimum"},
        {input: generateString(UserValidator.PASSWORD_UPPER_BOUND + 1), description: "More", boundary: "maximum"}
      ])(" - $description than the $boundary amount of characters", async({input})=>{
        user.password = input;
        await expect(UserValidator.validate(user)).rejects.toThrow()
      });
    });

    describe('The name has', () =>{
      it.each([
        {input: generateString(UserValidator.NAME_LOWER_BOUND - 1), description: "Less", boundary: "minimum"},
        {input: generateString(UserValidator.NAME_UPPER_BOUND + 1), description: "More", boundary: "maximum"}
      ])(" - $description than the $boundary amount of characters", async({input})=>{
        user.name = input;
        await expect(UserValidator.validate(user)).rejects.toThrow()
      });
    });

    it('The given email is invalid', async () =>{
      const invalidEmails: any[] = ['lolol', 2, true, '@email', {email: 'why@email.com'}];

      invalidEmails.forEach(async(value) =>{
        user.email = value;
        await expect(UserValidator.validate(user)).rejects.toThrow()
      })
    })

    it('The given cpf is invalid', async () =>{
      const invalidCPFs: any[] = ['lolol', 2, true, '342.341.234-12', '129.312.083-02', '435.342.543-53', '999.111.222-33','999.111.222-333'];

      invalidCPFs.forEach(async(value) =>{
        user.cpf = value;
        await expect(UserValidator.validate(user)).rejects.toThrow()
      })
    })

  })
})