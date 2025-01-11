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
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Info, Mail, Pen, User } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";

const feedbackFormSchema = z.object({
  subject: z.string().min(1, "Subject is required").max(100),
  message: z.string().min(1, "Message is required").max(1000),
  email: z.string().email(),
  name: z.string().min(1, "Name is required").max(20),
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
            <div className="rounded-lg bg-background p-3">
              <Pen size={24} className="text-blue-600" />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage preserveSpace />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-background p-3">
              <Info size={24} className="text-blue-600" />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage preserveSpace />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-background p-3">
                <Mail size={24} className="text-blue-600" />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage preserveSpace />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-xl bg-secondary p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-background p-3">
                <User size={24} className="text-blue-600" />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage preserveSpace />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" variant={"ringHover"} disabled>
          Submit
        </Button>
      </form>
    </Form>
  );
}
