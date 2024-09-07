"use client";

import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Info, Pen } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

const feedbackFormSchema = z.object({
  subject: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
  email: z.string().email(),
  name: z.string().min(1).max(20),
});

export function FeedbackForm() {
  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      subject: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof feedbackFormSchema>) => {
    console.log(values);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-4">
          <div className="flex items-center gap-2">
            <div className="self-end rounded-lg bg-background p-3">
              <Pen size={24} className="text-blue-600" />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full pb-1">
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-4">
          <div className="relative w-full">
            <div className="absolute left-0 top-1/2 flex h-10 w-10 items-center justify-center rounded-lg bg-background -translate-y-1">
              <Info size={24} className="text-blue-600" />
            </div>

            <div className="ml-12">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
