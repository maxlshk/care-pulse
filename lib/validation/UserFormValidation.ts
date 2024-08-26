import { z } from 'zod';

export const UserFormValidation = z.object({
    name: z
        .string()
        .min(2, { message: 'Your name must be at least 2 characters.' })
        .max(50, { message: 'Your name must be at most 50 characters.' }),
    email: z.string().email('Please enter a valid email address.'),
    phone: z.string().refine((phone) => {
        return (
            /^\+\d{10,15}$/.test(phone),
            { message: 'Please enter a valid phone number.' }
        );
    }),
});
