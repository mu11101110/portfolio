import type { ContactSchema } from "~/schema/contact";

type ContactApiResponse = {
  id: string;
  submittedAt: string;
  status: "accepted";
};

export const useContactApi = () => {
  // お問い合わせメール送信 API
  const sendContact = (data: ContactSchema): Promise<ContactApiResponse> => {
    return $fetch("/api/contact", {
      method: "POST",
      body: data,
    });
  };

  return {
    sendContact,
  };
};
