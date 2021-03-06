import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";

export default function SourceForm({
  item,
  handleSubmit,
  handleCancel,
  headerText,
  buttonText
}) {

  const { theme } = useTheme();
  const [itemArray, setItemArray] = useState([]); // [[key, value], [key, value], ...]

  useEffect(() => {
    if (item) {
      // if item for update passed
      setItemArray([...Object.entries(item)]);
      //console.log("item received in Form:", item);
    } else {
      // for adding new item
      const emptyItem = {
        title: "",
        name: "",
        surname: "",
        city: "",
        year: ""
      };
      setItemArray([...Object.entries(emptyItem)]);
    }
  }, [item]);

  return (
    <div className={"card mb-2 shadow bg-" + theme.mode + (theme.mode === "dark" ? " border-secondary" : "")}>
      <div className="card-header fw-bold text-center">{headerText}</div>
      <div className="card-body">
        <form>
          {itemArray && itemArray.length
            ? itemArray.map((keyValuePair, i) => (
                <Input
                  key={"key-value-pair-" + i}
                  defaultValue={keyValuePair[1]}
                  placeholder={keyValuePair[0]}
                  handleChange={(newValue) => {
                    const key = keyValuePair[0];
                    const updatedItemArray = [...itemArray];
                    updatedItemArray[i] = [...updatedItemArray[i]];
                    updatedItemArray[i] = [key, newValue];
                    setItemArray([...updatedItemArray]);
                  }}
                />
              ))
            : null}
        </form>
      </div>
      <div className="card-footer">
        <Button
          buttonStyle="primary"
          handleClick={() => handleSubmit(Object.fromEntries(itemArray))}
          buttonText={buttonText}
        />
        <Button
          buttonStyle="secondary"
          handleClick={handleCancel}
          buttonText="Cancel"
        />
      </div>
    </div>
  );
}
