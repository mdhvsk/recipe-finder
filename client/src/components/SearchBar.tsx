import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Send the query to your server
        const response = await fetch('/api/query-openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        // Handle the response...
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
