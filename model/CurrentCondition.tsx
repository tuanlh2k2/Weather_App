interface CurrentCondition {
  name: string;

  temp_c: number;

  condition_text: string;
  time: string;
  condition_code: number;
  is_day: number;
  condition_icon: string;
}
export default CurrentCondition;
