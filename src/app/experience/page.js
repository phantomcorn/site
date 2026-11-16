import { redirect } from "next/navigation"

/* The site is a single page now: this old address jumps to its section */
export default function Page() {
    redirect("/#experience")
}
