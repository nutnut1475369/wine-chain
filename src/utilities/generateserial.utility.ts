export class GenerateSerial {
  static generate(serial: number, number: number, type: number) {
    if (type === 1) {
      return this.serailId(serial) + this.serailSymbolShort(number)
    }else{
    return this.serailId(serial) + this.serailSymbolLong(number)
}
  }
  static serialSymbol( number: number, type: number){
    if (type === 1) {
        return this.serailSymbolShort(number)
      }
      return this.serailSymbolLong(number)
  
  }
  static serailId(serial: number) {
    return  String.fromCharCode(65 + Math.floor((Math.floor((serial / 26) % 26) / 26) % 26)) +
            String.fromCharCode(65 + Math.floor(((serial / 26) % 26))) +
            String.fromCharCode(65 + serial % 26)
  }
  static serailSymbolLong(number: number) {
    let nums = number % 10000
    nums += Math.floor(number/10000)
    let num = (nums).toString();
    for (let i = num.length; i < 4; i++) {
      num = 0 + num;
    }
    return String.fromCharCode(65 + Math.floor(Math.floor(number / 10000)/26) %26) + String.fromCharCode(65 + Math.floor(number / 10000) % 26) + num;
  }
  static serailSymbolShort(number: number) {
    let num = (number % 10000).toString();
    for (let i = num.length; i < 4; i++) {
      num = 0 + num;
    }
    return num;
}
}
