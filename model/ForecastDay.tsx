interface ForecastDay {
  maxTemp_c: number;
  minTemp_c: number;

  date: string;
  avgTemp_c: number;

  condition_code: number;
  name: string;
  region: string;
  condition_text: string;
  icon_link: string;
}
export default ForecastDay;
