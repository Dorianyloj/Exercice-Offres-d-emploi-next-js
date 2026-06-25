"use server";

export default async function jobMessageAction(formData: FormData) {
  const adminEmails = String(formData.get("adminEmails") || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  const jobMessage = {
    emails: adminEmails,
    jobTitle: String(formData.get("jobTitle") || ""),
    jobUid: String(formData.get("jobUid") || ""),
    message: String(formData.get("message") || ""),
  };

  console.log("Message offre envoyé :", jobMessage);
}
