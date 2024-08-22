import { useState } from "react";
import { useFieldValidator } from "./hooks/useFieldValidator";
import { useFormValidator } from "./hooks/useFormValidator";
import { Validator } from "./lib/Validators";

export default function App() {

  const [form, setForm, isValid] = useFormValidator(
    {name: "email", initialValue: "", validationFunctions: [Validator.email]},
    {name: "name", initialValue: "", validationFunctions: [Validator.maxLength(30), Validator.minLength(5)]},
    {name: "password", initialValue: "", validationFunctions: [Validator.password]}
  );

  const [showPassword, setShowPassword] = useState(false);

  const [nonBlankInput, setInput, isInputValid] = useFieldValidator("", Validator.nonBlank)

  return (
    <div className="App">
    <form>
      Email : <input type="email" name="email" value={form["email"].value} onChange={setForm} />
      <br/>
      Name : <input type="text" name="name" value={form["name"].value} onChange={setForm} />
      <br/>
      Password : <input type={showPassword ? "text" : "password"} name="password" value={form["password"].value} onChange={setForm} />
      
      <input type="button" onClick={ () => setShowPassword(!showPassword) } value="Show password" />
    </form>

      <p>Email valid : {form["email"].isValid.toString()}</p>
      <p>Name valid : {form["name"].isValid.toString()}</p>
      <p>Password valid : {form["password"].isValid.toString()}</p>
      <p>Form valid : {isValid.toString()}</p>

      <br/><br/>
      Non blank input : <input type="text" name="non-blank" value={nonBlankInput} onChange={setInput} />
      <p>Non-blank input valid : {isInputValid.toString()}</p>
    </div>
  );
}