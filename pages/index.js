import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Authentifi</title>
        <meta
          name="description"
          content="Validate Fake products, powered by Blockchaing Technology"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
