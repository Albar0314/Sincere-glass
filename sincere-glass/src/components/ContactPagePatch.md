# Contact Page Patch Instructions

In `src/app/contact/page.tsx`, replace the inline <form> block with:

1. Add import at the top:
   import ContactForm from "@/components/ContactForm";

2. Replace the entire <form>...</form> section with:
   <ContactForm />

The ContactForm component handles:
- All 6 fields (firstName, lastName, email, phone, subject, message)
- Honeypot anti-spam
- Submission to /api/contact
- Loading/success/error states
- Same styling as existing form

If your contact page is a Server Component (no "use client"),
you can keep it that way — ContactForm is its own client component.
