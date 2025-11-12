interface Suggestion {
  id: string;
  label: string;
}

const suggestions: Suggestion[] = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Cherry" },
  { id: "4", label: "Date" },
];

function getSuggestions(input: string): Suggestion[] {
  const lowerInput = input.toLowerCase();
  return suggestions.filter(s => s.label.toLowerCase().includes(lowerInput));
}

function useAutoSuggestion(initialValue: string = "") {
  const [inputValue, setInputValue] = React.useState(initialValue);
  const [suggestedItems, setSuggestedItems] = React.useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (isFocused && inputValue.length > 0) {
      setSuggestedItems(getSuggestions(inputValue));
    } else {
      setSuggestedItems([]);
    }
  }, [inputValue, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.label);
    setSuggestedItems([]);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 100); //Delay to allow suggestion click
  };

  return {
    inputValue,
    suggestedItems,
    handleInputChange,
    handleSuggestionClick,
    handleInputFocus,
    handleInputBlur
  };
}

function AutoSuggestionInput() {
  const {
    inputValue,
    suggestedItems,
    handleInputChange,
    handleSuggestionClick,
    handleInputFocus,
    handleInputBlur
  } = useAutoSuggestion();

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {suggestedItems.length > 0 && (
        <ul>
          {suggestedItems.map(suggestion => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}