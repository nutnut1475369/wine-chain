import { GenerateSerial } from '../../utilities/generateserial.utility';
describe('GenerateSerial', () => {
  it('generate short should return AAA0001', async () => {
    let data = {
      serial: 0,
      number: 1,
      type: 1,
    };
    let expects = 'AAA0001';
    let result = GenerateSerial.generate(data.serial, data.number, data.type);
    expect(result).toEqual(expects);
  });
  it('generate long should return AAAAA0001', async () => {
    let data = {
      serial: 0,
      number: 1,
      type: 2,
    };
    let expects = 'AAAAA0001';
    let result = GenerateSerial.generate(data.serial, data.number, data.type);
    expect(result).toEqual(expects);
  });
  it('SerialSymbol short Should return 0001', async () => {
    let data = {
      number: 1,
      type: 1,
    };
    let expects = '0001';
    let result = GenerateSerial.serialSymbol(data.number, data.type);
    expect(result).toEqual(expects);
  });

  it('SerialSymbol long Should return AA0001', async () => {
    let data = {
        number: 1,
        type: 2,
    };
    let expects = 'AA0001';
    let result = GenerateSerial.serialSymbol(data.number, data.type);
    expect(result).toEqual(expects);
  });

  it('SerialId Should return AAA', async () => {
    let data = {
      serial: 0,
    };
    let expects = 'AAA';
    let result = GenerateSerial.serailId(data.serial);
    expect(result).toEqual(expects);
  });

});
