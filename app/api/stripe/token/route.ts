export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const stripeCode = req.body.code;

      const response = await fetch('https://connect.stripe.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_secret=${process.env.STRIPE_SECRET_KEY}&code=${stripeCode}&grant_type=authorization_code`
      });

      const { access_token } = await response.json();
      return new Response(JSON.stringify({ stripe_token: access_token }), {
        status: 200
      });
      
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
