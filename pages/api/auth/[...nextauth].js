import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '1028185783157-tcip034b73b2jnca4kt2t37lv4qdvjif.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // You can add other providers here if needed
  ],
});