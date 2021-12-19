import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useEffect, useState } from "react";

export default function Form({
    item,
    itemKey,
    handleSubmit,
    buttonText }) {
    // recieves item object (with string values !!! )
    // convert item object into array
    // update array
    // passes updated array converted into updated item object through handle submit
    const [itemArray, setItemArray] = useState([]); // [[key, value], [key, value], ...]

    useEffect(() => {
        if (item) {
            setItemArray([...Object.entries(item)]);
            console.log("item received in Form:", item);
        }
    }, [item]);

    useEffect(() => {
        console.log("itemArray:", itemArray)
    }, [itemArray]);

    return (
        <form>
            {itemArray && itemArray.length
            ? itemArray.map((keyValuePair, i) =>
                <Input
                    key={"key-value-pair-" + i}
                    defaultValue={keyValuePair[1]}
                    placeholder={keyValuePair[0] + " goes here"}
                    handleChange={(newValue) => {
                        const key = keyValuePair[0];
                        const updatedItemArray = [...itemArray];
                        updatedItemArray[i] = [...updatedItemArray[i]];
                        updatedItemArray[i] = [key, newValue];
                        setItemArray([...updatedItemArray]);
                    }}
                />
                )
            : null}
            <Button
                handleClick={() => handleSubmit(Object.fromEntries(itemArray))}
                buttonText={buttonText}
            />
        </form>
    );
}