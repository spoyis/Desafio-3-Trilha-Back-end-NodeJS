import AddressInterface from "../src/modules/user/AddressInterface"
import UserInterface from "../src/modules/user/UserInterface"
import UserValidator from "../src/modules/user/UserValidator"

describe('UserValidator test suite', () =>{

  const validAddress : AddressInterface = {
    cep: 79006480,
    patio: 'Aduie Rezek',
    complement: 'casa 05',
    neighborhood:'vila bandeirante',
    locality: 'Campo Grande',
    uf: 'MS',
  }

  const validUser : UserInterface = {
    name: 'Leandro de Souza Oliveira',
    cpf: '501.110.431-15',
    birthDate: new Date('1965-12-20'),
    email: 'palmeirasnaotemmundial@corinthians.br',
    password: 'cassiodefesas2012',
    address: validAddress,
    qualified: true
  }

  let user: UserInterface;

  beforeEach(()=>{
    user = {...validUser};
  });

  it('Should return the user object, if the given inputs are valid', async ()=>{
    const result = await UserValidator.validate(user);

    expect(result).toEqual(user);
  });

  describe('Should return an error if any of the required inputs are missing', () =>{
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
      await expect(UserValidator.validate(user)).rejects.toThrow()
    });
  });

})