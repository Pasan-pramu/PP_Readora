import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";

const BookPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { userId } = await auth();
    if (!userId) redirect("/");

    const { slug } = await params;
    const result = await getBookBySlug(slug);

    if (!result.success || !result.data) redirect("/");

    const book = result.data;

    return (
        <div className="book-page-container">
            {/* Floating back button */}
            <Link href="/" className="back-btn-floating">
                <ArrowLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </Link>



                {/* Transcript area */}
                <VapiControls book={book}/>
            </div>

    );
};

export default BookPage;

