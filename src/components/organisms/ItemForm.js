import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { createDate } from "../../functions/functions";
import TagSearchForm from "../molecules/TagSearchForm";

export default function ItemForm({
    tags,
    addTags,
    passedItem,
    onItemFormClick,
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
            <form>
                <textarea
                    className={"form-control mb-2 + bg-" + theme.mode + " text-" + (theme.mode === "dark" ? "light" : "dark")}
                    placeholder="note content goes here"
                    defaultValue={item ? item.content : ""}
                    onChange={(e) =>
                        setItem({ ...item, content: e.target.value })
                    }
                ></textarea>
                <TagSearchForm
                    tags={tags}
                    chosenTags={itemTags}
                    setChosenTags={setItemTags}
                />
            </form>
            <Link
                to={link}
                type="button"
                className="btn btn-success mb-2 d-block text-white"
                onClick={() => {
                    const date = createDate();
                    let itemWithDate;
                    if (passedItemKey) {
                        itemWithDate = {...item, updatedAt: date};
                    } else {
                        itemWithDate = {...item, createdAt: date};
                    }
                if (itemWithDate) {
                    addNewTagsToDatabase();
                    if (passedItemKey) {
                        onItemFormClick(itemWithDate, passedItemKey);
                    } else {
                        onItemFormClick(itemWithDate);
                    }
                } else {
                    alert("There is a problem with adding/ updating date to your note... Note is not created / updated");
                }
                console.log(item);
                }}
            >
                {buttonText}
            </Link>
        </div>
    );
}
