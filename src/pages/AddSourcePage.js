import { useEffect, useState } from "react/cjs/react.development";
import Form from "../components/organisms/Form";
import { useDatabase } from "../hooks/use-database";
import { useAuth } from "../hooks/use-auth";

export default function AddSourcePage() {
  const { sources, addSource } = useDatabase();
  const { user } = useAuth();

  const [item, setItem] = useState(null);

  function onFormSubmit(updatedItem) {
    addSource(updatedItem);
  }

  useEffect(() => {
    if (item) {
      console.log("item in AddSourcePage:", item);
    }
  }, [item]);

  return (
    <div>
      {user && user.uid ? (
        <div>
          <Form
            item={item}
            handleSubmit={onFormSubmit}
            headerText="Add new source!"
            buttonText="Add new source"
          />
        </div>
      ) : (
        <h3>You need to log in to add a source...</h3>
      )}
    </div>
  );
}
