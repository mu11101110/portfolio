import * as z from "zod";
import { validMessages } from "~/assets/errors/validMessages";
import { Gender, Prefectures, InquiryList } from "~/types/Input";

const { correctEmailFormat, requiredInput, requiredChoice } = validMessages;

export const ContactSchema = z.object({
  name: z
    .string({
      required_error: requiredInput,
    })
    .trim()
    .min(1, { message: requiredInput }),
  prefectures: z
    .string({
      required_error: requiredInput,
    })
    .refine((v) => v !== "", { message: requiredInput })
    .refine((v) => Prefectures.includes(v as (typeof Prefectures)[number]), {
      message: requiredChoice,
    }),
  email: z
    .string({
      required_error: requiredInput,
    })
    .trim()
    .min(1, { message: requiredInput })
    .email({ message: correctEmailFormat }),
  gender: z
    .enum(Gender, {
      required_error: requiredInput,
    })
    .refine((val) => Gender.includes(val), {
      message: requiredChoice,
    }),
  inquiry: z.array(z.enum(InquiryList)).min(1, requiredInput),
});

export type ContactSchema = z.TypeOf<typeof ContactSchema>;
