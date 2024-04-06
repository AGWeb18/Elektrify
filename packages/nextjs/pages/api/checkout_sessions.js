import { supabase } from "../../services/supabaseClient";

/* eslint-disable @typescript-eslint/no-var-requires */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Convert totalCost to the lowest currency unit (e.g., cents for USD)
    const { totalCost, chargerId, userId, numHours, bookingDate } = req.body;
    const amount = Math.round(parseFloat(totalCost) * 100);

    // Use these values in your database operation, e.g., inserting a booking record
    const { data: insertData, error: insertError } = await supabase.from("fct_bookings").insert([
      {
        charger_id: chargerId,
        user_id: userId,
        num_hours: numHours,
        booking_date: bookingDate,
        status: "booked", // Default value, could also be set at the database level
      },
    ]);

    // try {
    //   const price = await stripe.prices.create({
    //     currency: "cad",
    //     unit_amount: amount,
    //     product_data: { name: "EV Charge" },
    //   });

    //   // Create Checkout Sessions from body params.
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //         price: price.id,
    //         quantity: 1,
    //       },
    //     ],
    //     mode: "payment",
    //     success_url: `${req.headers.origin}/?success=true`,
    //     cancel_url: `${req.headers.origin}/`,
    //     automatic_tax: { enabled: true },
    //   });
    //   res.redirect(303, session.url);
    // } catch (err) {
    //   res.status(err.statusCode || 500).json(err.message);
    // }

    console.log(insertData);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
