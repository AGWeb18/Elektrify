import { supabase } from "../../services/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body; // Expect email and password in the request body

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      const { session, user } = data;
      // Assuming you have a URL to redirect the user after account creation
      const url = "localhost:3000";
      res.status(200).json({ url });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
