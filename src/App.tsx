import { useFieldValidator } from "./hooks/useFieldValidator";
import { useFormValidator } from "./hooks/useFormValidator";
import { Validator } from "./lib/Validators";

export default function App() {

  const [form, setForm, isValid] = useFormValidator(
    {name: "email", initialValue: "", validationFunctions: [Validator.email]},
    {name: "name", initialValue: "", validationFunctions: [Validator.maxLength(30), Validator.minLength(5)]},
    {name: "password", initialValue: "", validationFunctions: [Validator.password]}
  );

  const [nonBlankInput, setInput, isInputValid] = useFieldValidator("", Validator.nonBlank)

  return (
    <div className="App">
    <form>
      <input type="email" name="email" value={form["email"].value} onChange={setForm} />
      <input type="text" name="name" value={form["name"].value} onChange={setForm} />
      <input type="text" name="password" value={form["password"].value} onChange={setForm} />
    </form>
      <p>{isValid.toString()}</p>


      <input type="text" name="non-blank" value={nonBlankInput} onChange={setInput} />
    </div>
  );
}