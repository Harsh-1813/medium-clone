import { Hono } from "hono";

export const storageRouter = new Hono<{
    Bindings: {
        GCS_PROJECT_ID: string
        GCS_CLIENT_EMAIL: string
        GCS_PRIVATE_KEY: string
        GCS_BUCKET_NAME: string
    }
}>();

function base64Encode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function parsePemToArrayBuffer(pem: string): ArrayBuffer {
    const pemContents = pem
        .replace(/-----BEGIN PRIVATE KEY-----/, "")
        .replace(/-----END PRIVATE KEY-----/, "")
        .replace(/\s+/g, ""); // remove newlines and spaces

    const binaryDerString = atob(pemContents);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
    }
    return binaryDer.buffer;
}

storageRouter.post("/get-upload-url", async (c) => {
    try {
        const { originalName } = await c.req.json();

        if (!originalName) {
            return c.json({ error: "Filename is required" }, 400);
        }
        //generate unique filename with timestamp
        const timestamp=Date.now();
        const ext = originalName.includes(".")
        ?originalName.split(".").pop()
        :"jpg";
        const baseName=originalName.replace(/\.[^/.]+$/, "");//remove ext
        const filename=`${baseName}-${timestamp}.${ext}`;

        const clientEmail = c.env.GCS_CLIENT_EMAIL;
        const privateKey = c.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n');
        const bucket = c.env.GCS_BUCKET_NAME;

        const method = 'PUT';
        const expires = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
        const canonicalUri = `/${bucket}/${filename}`;

        // Construct the string to sign
        const stringToSign = [
            method,
            '', // Content-MD5
            'image/jpeg', // Content-Type
            expires,
            canonicalUri
        ].join('\n')

        // Sign the string with the service account private key
        const keyData = parsePemToArrayBuffer(privateKey);


        const cryptoKey = await crypto.subtle.importKey(
            'pkcs8',
            keyData,
            { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
            false,
            ['sign']
        );

        //sign the string
        const encoder = new TextEncoder();
        const signature = await crypto.subtle.sign(
            "RSASSA-PKCS1-v1_5",
            cryptoKey,
            encoder.encode(stringToSign)
        );
        const signedUrl = `https://storage.googleapis.com${canonicalUri}?GoogleAccessId=${clientEmail}&Expires=${expires}&Signature=${encodeURIComponent(
            base64Encode(signature)
        )}`;


        return c.json({
            signedUrl,
            publicUrl: `https://storage.googleapis.com/${c.env.GCS_BUCKET_NAME}/${filename}`,
        });
    } catch (err: any) {
        console.error("error generating signed URL:", err);
        return c.json({ error: "Failed to generate signed url" }, 500);
    }
})