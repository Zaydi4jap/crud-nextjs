import Head from "next/head";
import { Navbar } from "./NavBar";

export const Layout = ({children}) => (
    <>
        <Head>
            <title>Form App</title>
        </Head>
        <Navbar />
        {children}
    </>
);