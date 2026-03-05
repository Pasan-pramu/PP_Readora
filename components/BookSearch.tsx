'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState } from 'react';

const BookSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') ?? '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/?q=${encodeURIComponent(trimmed)}`);
        } else {
            router.push('/');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Clear search when input is emptied
        if (!value.trim()) {
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="library-search-wrapper shadow-soft-sm">
            <Search className="w-4 h-4 text-[var(--text-muted)] ml-4 shrink-0" />
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search by title or author…"
                className="library-search-input"
            />
        </form>
    );
};

export default BookSearch;

