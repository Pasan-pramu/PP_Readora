import {NextResponse} from "next/server";
import {handleUpload, HandleUploadBody} from "@vercel/blob/client";
import {auth} from "@clerk/nextjs/server";
import {MAX_FILE_SIZE} from "@/lib/constants";

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    // BUG FIX: Validate token exists before attempting upload.
    // If BLOB_READ_WRITE_TOKEN is missing or malformed (e.g. wrapped in quotes),
    // handleUpload will fail with a cryptic "cannot retrieve token" error.
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
        console.error('BLOB_READ_WRITE_TOKEN is not set in environment variables');
        return NextResponse.json({ error: 'Server configuration error: missing blob token' }, { status: 500 });
    }

    try {
        const jsonResponse = await handleUpload({
            token: blobToken,
            body,
            request,
            onBeforeGenerateToken: async () => {
                const { userId } = await auth();

                if(!userId) {
                    throw new Error('Unauthorized: User not authenticated');
                }

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    addRandomSuffix: true,
                    maximumSizeInBytes: MAX_FILE_SIZE,
                    tokenPayload: JSON.stringify({ userId })
                }
            } ,
            onUploadCompleted: async ({ blob }) => {
                console.log('File uploaded to blob: ', blob.url)

                // TODO: PostHog
            }
        });

        return NextResponse.json(jsonResponse)
    } catch (e) {
        console.error('Blob upload error:', e);
        const message = e instanceof Error ? e.message : "An unknown error occurred";
        const status = message.includes('Unauthorized') ? 401 : 500;
        return NextResponse.json({ error: message }, { status });
    }
}
