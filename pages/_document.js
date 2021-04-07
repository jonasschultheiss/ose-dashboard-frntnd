import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-gray-300 h-screen">
        <Head />
        <body className="bg-gray-300 h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
