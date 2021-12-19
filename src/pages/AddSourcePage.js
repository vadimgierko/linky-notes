import { useEffect, useState } from "react/cjs/react.development";
import Form from "../components/organisms/Form";
import { useDatabase } from "../hooks/use-database";

export default function AddSourcePage() {

    const { sources, addSource} = useDatabase();

    const [item, setItem] = useState({
        title: "",
        subtitle: "",
        originalTitle: "",
        originalSubtitle: "",
        author: "",
        city: "",
        year: ""
    });

    function onFormSubmit(updatedItem) {
        //setItem(updatedItem);
        addSource(updatedItem);
    }

    useEffect(() => {
        if (item) {
            console.log("item in AddSourcePage:", item);
        }
    }, [item]);

    return (
        <div>
            <h3>Add new source!</h3>
            <Form
                item={item}
                handleSubmit={onFormSubmit}
                buttonText="Add new source"
            />
        </div>
    );
}