import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/use-theme";
import { useDatabase } from "../hooks/use-database";
import { createDate } from "../functions/functions";
import ItemForm from "../components/organisms/ItemForm";

export default function AddItemForm() {

  const { theme } = useTheme();
  const { addItem, tags, addTags } = useDatabase();

  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <ItemForm
        tags={tags && tags.length ? tags : []}
        addTags={addTags}
        onItemFormClick={addItem}
        link="/items"
        buttonText="Add a new note"
      />
    </div>
  );
}
