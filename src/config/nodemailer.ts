//
import nodemailer from "nodemailer"

const user = "igortza.98483@gmail.com"
const password = "thwj ectp jygb ccmn";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: user, pass: password },
})