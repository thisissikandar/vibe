import { createAgent, grok, openai } from "@inngest/agent-kit";

import { inngest } from "./client";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const dbaAgent = createAgent({
      name: "Database administrator",
      description: "Provides expert support for managing PostgreSQL databases",
      system:
        "You are a PostgreSQL expert database administrator. " +
        "You only provide answers to questions related to PostgreSQL database schema, indexes, and extensions.",
      model: grok({
        model: "grok-3-latest",
      }),
    });
      const { output } = await dbaAgent.run(
    `${event.data.value}`,
    );
    return { output };
  }
);
