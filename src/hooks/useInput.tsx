import { useState } from "react";

type UseInputReturn = [string, (e: React.ChangeEvent<HTMLInputElement>) => void];

function useInput(initialValue: string): UseInputReturn {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return [value, onChangeValue];
}
export default useInput;
