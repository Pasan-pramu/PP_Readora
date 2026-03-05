import React, { Suspense } from 'react'
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import BookSearch from "@/components/BookSearch";
import {getAllBooks} from "@/lib/actions/book.actions";

const Page = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {
    const { q } = await searchParams;
    const bookResults = await getAllBooks(q);
    const books = bookResults.success ? bookResults.data ?? [] : [];

    return (
        <main className="wrapper container">
            <HeroSection />

            {/* Search row */}
            <div className="library-filter-bar">
                <h2 className="section-title">
                    {q ? `Results for "${q}"` : 'Recent Books'}
                </h2>
                <Suspense fallback={null}>
                    <BookSearch />
                </Suspense>
            </div>

            {books.length > 0 ? (
                <div className="library-books-grid">
                    {books.map((book) => (
                        <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                    ))}
                </div>
            ) : (
                <div className="library-empty-card text-center">
                    <p className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                        {q ? 'No books found' : 'No books yet'}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                        {q ? 'Try a different search term' : 'Upload your first book to get started'}
                    </p>
                </div>
            )}
        </main>
    )
}

export default Page