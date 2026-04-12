import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { getUserFromSession, createUserSession } from "~/auth.server";
import { User } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "Sign In — XEN Studio" },
];

interface MomenceCustomer {
  memberId: number;
  email: string;
  firstName: string;
  lastName: string;
  activeSubscriptions: { name: string; status: string }[];
}

async function findMomenceCustomer(email: string): Promise<MomenceCustomer | null> {
  const hostId = process.env.MOMENCE_HOST_ID ?? "230727";
  const token = process.env.MOMENCE_TOKEN ?? "4a041985b5";
  const needle = email.toLowerCase().trim();

  let page = 1;
  while (page <= 10) {
    const res = await fetch(
      `https://momence.com/_api/primary/api/v1/Customers?hostId=${hostId}&token=${token}&page=${page}&pageSize=50`
    );
    if (!res.ok) break;
    const data = await res.json();
    const customers: MomenceCustomer[] = data.payload ?? [];
    if (customers.length === 0) break;

    const match = customers.find((c) => c.email.toLowerCase().trim() === needle);
    if (match) return match;
    page++;
  }
  return null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromSession(request);
  if (user) throw redirect("/profile");
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = (formData.get("email") as string | null)?.trim() ?? "";

  if (!email) return { error: "Please enter your email." };

  const customer = await findMomenceCustomer(email);

  if (!customer) {
    return {
      error:
        "No account found with that email. Make sure you use the email registered when you booked at XEN Studio.",
    };
  }

  return createUserSession(
    {
      id: String(customer.memberId),
      email: customer.email,
      name: `${customer.firstName} ${customer.lastName}`.trim(),
      picture: null,
    },
    "/profile"
  );
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center">
            <User size={24} className="text-forest" />
          </div>
        </div>

        <h1 className="font-display text-2xl text-white text-center mb-2">Booking History</h1>
        <p className="text-white/40 text-sm text-center mb-8">
          Enter the email you use on Momence to view your past bookings.
        </p>

        <Form method="post" className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              autoFocus
              className="w-full bg-cream-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-forest/50 transition-colors"
            />
          </div>

          {actionData?.error && (
            <p className="text-red-400 text-xs">{actionData.error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-forest text-white text-sm font-medium tracking-widest uppercase hover:bg-forest/80 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? "Looking up account…" : "Sign In"}
          </button>
        </Form>

        <p className="text-white/25 text-xs text-center mt-6">
          New to XEN?{" "}
          <a
            href="https://momence.com/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
          >
            Sign in with Momence
          </a>
        </p>
      </div>
    </div>
  );
}
