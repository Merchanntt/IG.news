import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from "faunadb";
import { getSession } from "next-auth/client";
import { fauna } from "../../services/faunadb";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customers_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const session = await getSession({ req });

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customers_id

    if(!customerId) {
      const stripeCustumer = await stripe.customers.create({
        email: session.user.email
      })
  
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customers_id: stripeCustumer.id
            }
          }
        )
      )

      customerId = stripeCustumer.id
      
    } 

    const stripeCheckOutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1Ja5H3IMUrB7L7tAcMwdNHRr', quantity: 1},
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.POSTS_PAGE,
      cancel_url: process.env.HOME_PAGE
    })

    return res.status(200).json({sessionId: stripeCheckOutSession.id})

  } else {
    res.setHeader('Allow', 'POST'),
    res.status(405).end('Method not allowed')
  }
}