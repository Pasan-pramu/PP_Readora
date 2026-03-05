'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff } from 'lucide-react';
import useVapi from '@/hooks/useVapi';
import { IBook } from '@/types';
import Image from 'next/image';
import Transcript from '@/components/Transcript';
import { formatDuration } from '@/lib/utils';

/** Map Vapi call status → human label */
const STATUS_LABELS: Record<string, string> = {
    idle: 'Ready',
    connecting: 'Connecting…',
    starting: 'Starting…',
    listening: 'Listening',
    thinking: 'Thinking…',
    speaking: 'Speaking',
};

/** Map Vapi call status → CSS dot modifier class */
const STATUS_DOT_CLASS: Record<string, string> = {
    idle: 'vapi-status-dot-ready',
    connecting: 'vapi-status-dot-connecting',
    starting: 'vapi-status-dot-connecting',
    listening: 'vapi-status-dot-listening',
    thinking: 'vapi-status-dot-thinking',
    speaking: 'vapi-status-dot-speaking',
};

const VapiControls = ({ book }: { book: IBook }) => {
    const router = useRouter();
    const {
        status,
        isActive,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        maxDurationSeconds,
        showTimeWarning,
        limitError,
        start,
        stop,
        clearError,
    } = useVapi(book);

    // Redirect to home when session time limit is reached
    useEffect(() => {
        if (limitError && limitError.includes('Session time limit')) {
            const timeout = setTimeout(() => router.push('/'), 3000);
            return () => clearTimeout(timeout);
        }
    }, [limitError, router]);

    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Limit error banner */}
                {limitError && (
                    <div className="error-banner">
                        <div className="error-banner-content">
                            <p className="text-sm text-red-700 flex-1">{limitError}</p>
                            {!limitError.includes('Session time limit') && (
                                <button onClick={clearError} className="error-banner-dismiss text-sm">
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Header Card */}
                <div className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL || '/images/book-placeholder.png'}
                            alt={book.title}
                            width={120}
                            height={180}
                            className="vapi-cover-image !w-[120px] !h-auto"
                            priority
                        />
                        <div className="vapi-mic-wrapper relative">
                            {isActive && (status === 'speaking' || status === 'thinking') && (
                                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                            )}
                            <button
                                onClick={isActive ? stop : start}
                                disabled={status === 'connecting'}
                                className={`vapi-mic-btn shadow-md !w-[60px] !h-[60px] z-10 ${isActive ? 'vapi-mic-btn-active' : 'vapi-mic-btn-inactive'}`}
                            >
                                {isActive ? (
                                    <Mic className="size-7 text-[#663820]" />
                                ) : (
                                    <MicOff className="size-7 text-[#212a3b]" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                                {book.title}
                            </h1>
                            <p className="text-[#3d485e] font-medium">by {book.author}</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {/* Dynamic status indicator */}
                            <div className="vapi-status-indicator">
                                <span className={`vapi-status-dot ${STATUS_DOT_CLASS[status] || 'vapi-status-dot-ready'}`} />
                                <span className="vapi-status-text">
                                    {STATUS_LABELS[status] || 'Ready'}
                                </span>
                            </div>

                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {book.persona || 'Daniel'}</span>
                            </div>

                            {/* Live timer: elapsed / max */}
                            <div className={`vapi-status-indicator ${showTimeWarning ? 'vapi-time-warning' : ''}`}>
                                <span className="vapi-status-text">
                                    {formatDuration(duration)}/{formatDuration(maxDurationSeconds)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vapi-transcript-wrapper">
                    <div className="transcript-container min-h-[400px]">
                        <Transcript
                            messages={messages}
                            currentMessage={currentMessage}
                            currentUserMessage={currentUserMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VapiControls;
