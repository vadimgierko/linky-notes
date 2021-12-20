import { useDatabase } from "../hooks/use-database";
import TagButton from "../components/atoms/TagButton";
const ALPHABET = [
  "a",
  "b",
  "c",
  "ć",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "ł",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "ś",
  "t",
  "u",
  "w",
  "v",
  "x",
  "y",
  "z",
  "ź",
  "ż"
];

export default function TagsPage() {
  const { tags } = useDatabase();
  return (
    <div className="tags-list">
      {ALPHABET.map((letter) => (
        <div key={letter + "-section"} className="letter-section-in-tags-list">
          <h5>{letter}</h5>
          <hr />
          <div>
            {tags.map((tag) =>
              tag[0] === letter ? (
                <TagButton key={"tag-button-for-" + tag} tag={tag} />
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
