import { define } from "../../utils.ts";
import { isSuperAdmin } from "../../lib/auth.ts";

export default define.middleware(async (ctx) => {
  // Check if user is authenticated (done by parent middleware)
  if (!ctx.state.authUser) {
    return new Response("", {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  // Check if user is superadmin
  if (!isSuperAdmin(ctx.state.authUser.profile)) {
    return new Response("Forbidden: Superadmin access required", {
      status: 403,
    });
  }

  return ctx.next();
});
