import Head from "next/head";
import ButtonLogout from "../button-logout";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title} | Port site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
      <ButtonLogout />
    </div>
  );
}
