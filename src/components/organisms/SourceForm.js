import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { createDate } from "../../functions/functions";
import Form from "./Form";

export default function SourceForm({
    passedItem,
    handleSubmit,
    link,
    buttonText,
    headerText,
    passedItemKey
    }) {

    const { theme } = useTheme();
    const [itemTags, setItemTags] = useState([]);

    const [item, setItem] = useState(null);
    
    useEffect(() => {
        if (passedItem) {
            setItem({...passedItem});
            if (passedItem.tags.length) {
                setItemTags([...passedItem.tags]);
            } 
        } else {
            setItem({
                content: "",
                tags: [],
                source: "",
                createdAt: null,
                updatedAt: null
            });
        }
    }, [passedItem]);

    useEffect(() => {
        if (item) {
            setItem({...item, tags: [...itemTags]});
        }
    }, [itemTags]);

    function addNewTagsToDatabase() {
        let newTags = [];
        for (let i = 0; i < item.tags.length; i++) {
            const newTag = item.tags[i];
            if (!tags.includes(newTag)) {
                newTags.push(newTag);
            }
        }
        if (newTags.length) {
            addTags(newTags);
            console.log("New tags:", newTags);
        } else {
            console.log("There are no new tags!");
        }
    }

    useEffect(() => {
        if (item) {
            console.log("item:", item);
        }
    }, [item]);

    return (
        <div
            style={{ background: theme.background, color: theme.color }}
        >
            <h3>{headerText}</h3>
            <hr />
            <Form
                item
                buttonText={buttonText}
            />
        </div>
    );
}
