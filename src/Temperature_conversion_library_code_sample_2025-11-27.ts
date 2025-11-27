namespace TemperatureConverter {

  export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

  export function convert(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
    if (from === to) {
      return value;
    }

    let celsiusValue: number;

    switch (from) {
      case 'celsius':
        celsiusValue = value;
        break;
      case 'fahrenheit':
        celsiusValue = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsiusValue = value - 273.15;
        break;
      default:
        throw new Error(`Unsupported 'from' unit: ${from}`);
    }

    switch (to) {
      case 'celsius':
        return celsiusValue;
      case 'fahrenheit':
        return (celsiusValue * 9 / 5) + 32;
      case 'kelvin':
        return celsiusValue + 273.15;
      default:
        throw new Error(`Unsupported 'to' unit: ${to}`);
    }
  }

  export function toCelsius(value: number, from: Exclude<TemperatureUnit, 'celsius'>): number {
    return convert(value, from, 'celsius');
  }

  export function toFahrenheit(value: number, from: Exclude<TemperatureUnit, 'fahrenheit'>): number {
    return convert(value, from, 'fahrenheit');
  }

  export function toKelvin(value: number, from: Exclude<TemperatureUnit, 'kelvin'>): number {
    return convert(value, from, 'kelvin');
  }
}

export default TemperatureConverter;