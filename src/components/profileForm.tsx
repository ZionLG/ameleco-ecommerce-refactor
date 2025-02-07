"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "~/components/form/FormInput";
import FormSelect from "~/components/form/FormSelect";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { api, type RouterInputs } from "~/trpc/react";

type ProfileSchema = Required<RouterInputs["user"]["editProfile"]>;

const items = [
  {
    value: "electrician",
    label: "Electrician",
  },
  {
    value: "handyman",
    label: "Handyman",
  },
  {
    value: "homeOwner",
    label: "Home Owner",
  },
] satisfies {
  value: ProfileSchema["group"];
  label: string;
}[];

function ProfileForm({
  profileData,
  action,
}: {
  profileData?: ProfileSchema;
  action: "create" | "edit";
}) {
  const form = useForm<ProfileSchema>({
    defaultValues: {
      address: profileData?.address ?? "",
      firstName: profileData?.firstName ?? "",
      lastName: profileData?.lastName ?? "",
      phone: profileData?.phone ?? "",
      company: profileData?.company ?? "",
      group: profileData?.group ?? "electrician",
    },
  });

  const { handleSubmit, control } = form;

  const router = useRouter();

  const utils = api.useUtils();

  const { mutate, isPending } = api.user.editProfile.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      if (action === "create") {
        router.push("/shop");
      }
      toast.success(`Profile has been ${action === "create" ? "created" : "updated"}.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (values: ProfileSchema) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-5"
      >
        <div className="flex gap-5">
          <FormInput
            control={control}
            name="firstName"
            label="First Name"
            className="grow"
            rules={{ required: "First name is required" }}
          />
          <FormInput
            control={control}
            name="lastName"
            label="Last Name"
            className="grow"
            rules={{ required: "Last name is required" }}
          />
        </div>
        <div className="flex gap-5">
          <FormInput
            control={control}
            name="company"
            label="Company"
            className="grow"
            rules={{ required: "Company name is required" }}
          />
          <FormInput
            control={control}
            name="phone"
            label="Phone"
            type="tel"
            className="grow"
            rules={{
              required: "Phone number is required",
              // pattern: {
              //   value: /^\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*$/,
              //   message: "Invalid phone number",
              // },
            }}
          />
        </div>
        <FormInput
          control={control}
          name="address"
          label="Address"
          className="grow"
          rules={{ required: "Address is required" }}
        />
        <FormSelect
          control={control}
          name="group"
          label="Group"
          rules={{ required: "Group is required" }}
          items={items}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2"
        >
          <span>Submit</span>
          {isPending && <Loader2 size={36} className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
