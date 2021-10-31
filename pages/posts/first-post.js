import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

const firstPost = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>First Post </title>
        </Head>
        <h2>
          <Link href="/">Back to Home </Link>
        </h2>
      </Layout>
    </>
  );
};

export default firstPost;
