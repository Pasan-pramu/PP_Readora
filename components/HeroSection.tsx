import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className="wrapper mb-10 md:mb-16 pt-28 md:pt-32">
            <div className="library-hero-card shadow-soft-lg">
                <div className="library-hero-content">
                    {/* Left Part */}
                    <div className="library-hero-text">
                        <h1 className="library-hero-title text-3xl md:text-4xl lg:text-[44px] font-serif font-bold leading-tight">
                            Your Library
                        </h1>
                        <p className="library-hero-description text-base md:text-lg leading-relaxed">
                            Convert your books into interactive AI conversations. <br className="hidden md:block" />
                            Listen, learn, and discuss your favorite reads.
                        </p>
                        <Link 
                            href="/books/new" 
                            className="library-cta-primary mt-4 md:mt-6 flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-md transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" strokeWidth={2.5} />
                            <span className="text-[#212a3b] font-bold">Add new book</span>
                        </Link>
                    </div>

                    {/* Center Part - Desktop */}
                    <div className="library-hero-illustration-desktop">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </div>

                    {/* Center Part - Mobile (Hidden on Desktop) */}
                    <div className="library-hero-illustration">
                        <Image
                            src="/assets/hero-illustration.png"
                            alt="Vintage books and a globe"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>

                    {/* Right Part */}
                    <div className="library-steps-card min-w-[260px] max-w-[280px] w-full lg:w-auto z-10 shadow-soft-lg">
                        <ul className="space-y-5">
                            <li className="library-step-item">
                                <div className="library-step-number shadow-soft-sm shrink-0">
                                    <span className="font-bold">1</span>
                                </div>
                                <div className="flex flex-col gap-0.5 flex-1">
                                    <h3 className="library-step-title font-semibold">Upload PDF</h3>
                                    <p className="library-step-description text-sm">Add your book file</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="library-step-number shadow-soft-sm shrink-0">
                                    <span className="font-bold">2</span>
                                </div>
                                <div className="flex flex-col gap-0.5 flex-1">
                                    <h3 className="library-step-title font-semibold">AI Processing</h3>
                                    <p className="library-step-description text-sm">We analyze the content</p>
                                </div>
                            </li>
                            <li className="library-step-item">
                                <div className="library-step-number shadow-soft-sm shrink-0">
                                    <span className="font-bold">3</span>
                                </div>
                                <div className="flex flex-col gap-0.5 flex-1">
                                    <h3 className="library-step-title font-semibold">Voice Chat</h3>
                                    <p className="library-step-description text-sm">Discuss with AI</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>



        </section>
    )
}

export default HeroSection