export default function Button({ buttonStyle, buttonText, handleClick }) {
  return (
    <button
      type="button"
      className={"btn btn-" + buttonStyle + " mb-2 me-2"}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}
