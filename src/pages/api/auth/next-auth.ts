import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                username: { label: "Username", type: "text", placeholder: "jsmith@example.com" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials: any) => {
                try{
                    const {data: user} = await axios.post("http://localhost:3000/api/auth/login", {
                        email: credentials.username,
                        password: credentials?.password
                    });
                    if(user){
                        return user;
                    } else{
                        return null;
                    }
                }
                catch(err){
                    throw new Error("Login failed");
                }
            },
        }),
    ],
});
