import parseJSON from "@/utils/parseJSON";
import text from "@/constants/text.txt?raw";
import test from "@/constants/test.json";
import { compareArrays } from "@/utils/compare";
const Settings = () => {
  const json = parseJSON(text);
  console.log(compareArrays(json, test));
  return <div></div>;
};

export default Settings;
