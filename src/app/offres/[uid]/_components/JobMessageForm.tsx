import jobMessageAction from "@/actions/job-message";

type JobMessageFormProps = {
  adminEmails: string[];
  jobTitle: string;
  jobUid: string;
};

export function JobMessageForm({
  adminEmails,
  jobTitle,
  jobUid,
}: JobMessageFormProps) {
  return (
    <form action={jobMessageAction} className="mt-10 border-t border-slate-200 pt-8">
      <input type="hidden" name="adminEmails" value={adminEmails.join(",")} />
      <input type="hidden" name="jobTitle" value={jobTitle} />
      <input type="hidden" name="jobUid" value={jobUid} />
      <textarea
        id="job-message"
        name="message"
        rows={5}
        required
        className="mt-4 w-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)]"
        placeholder="Postuler à cette offre ..."
      />

      <button
        type="submit"
        className="mt-4 inline-flex h-11 items-center justify-center bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--dark)] hover:text-[var(--primary)]"
      >
        Envoyer
      </button>
    </form>
  );
}
