import { ContactSchema } from "~/schema/contact";

const mockFailureEmail = "test@error.com";

export default defineEventHandler(async (event) => {
  const body = await readBody<unknown>(event);
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      data: parsed.error.flatten().fieldErrors,
    });
  }

  await wait();

  if (parsed.data.email === mockFailureEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }

  const date = new Date().toISOString();

  return {
    id: "contact-" + date,
    submittedAt: date,
    status: "accepted",
  };
});

const wait = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
