import { useState } from "react";

function SearchBar({ placeholder, onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
        />
    );
}

export default SearchBar;