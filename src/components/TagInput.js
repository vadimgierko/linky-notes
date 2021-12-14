export default function TagInput({ inputValue, setInputValue }) {
    return (
      <input
        type="text"
        defaultValue={inputValue}
        placeholder="type your tag here"
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  }