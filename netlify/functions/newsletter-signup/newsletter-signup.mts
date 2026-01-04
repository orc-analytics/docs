import { Context } from '@netlify/functions'
import crypto from 'crypto'

export default async (request: Request, context: Context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers }
    );
  }

  try {
    // Parse request body
    const body = await request.json();
    const { email, formtype } = body;
    
    // Validate input
    if (!email || !formtype) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { status: 400, headers }
      );
    }

    // Generate submission ID
    const submissionId = crypto.randomUUID();
    
    // Prepare payload
    const payload = JSON.stringify({ email, formtype });
    
    // Compute HMAC signature
    const secret = process.env.WEBHOOK_SECRET;
    if (!secret) {
      console.error('WEBHOOK_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { status: 500, headers }
      );
    }

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    hmac.update(submissionId);
    const signature = 'sha256=' + hmac.digest('hex');

    // Forward to your backend
    const backendResponse = await fetch(
      'https://webhooks-api-356883915714.europe-west2.run.app/handle_form_submission',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Framer-Signature': signature,
          'framer-webhook-submission-id': submissionId
        },
        body: payload
      }
    );

    if (backendResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: 'Subscribed successfully' }), 
        { status: 200, headers }
      );
    } else {
      console.error('Backend error:', await backendResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }), 
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers }
    );
  }
}
