"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: (data) => {
        toast.success("background job started");
        console.log("Function invoked successfully:", data);
      },
      onError: (error) => {
        console.error("Error invoking function:", error);
      },
    })
  );
  return (
    <>
      <div>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={invoke.isPending}
          onClick={() => invoke.mutate({ value: value })}
        >
          invoke function
        </Button>
      </div>
    </>
  );
}
