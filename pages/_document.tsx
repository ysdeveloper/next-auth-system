import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <meta name="author" content="YsDeveloper"/>
            <meta name="description" content="A micro app which provides an Authentication compatible with the highly used Databases like MongoDB, Firebase, SQL etc., Just easy to implement it on your project by copy-paste some components." />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
      </Html>
    )
  }
}

export default MyDocument