
export const Ogp = () => {
  const title = 'VWBL Demo App';
  const description = 'VWBLのコアコンセプト(持っている人だけがコンテンツを視聴できる)が体験できるデモサイトです';
  const url = 'https://demo-app.vwbl-protocol.org/';
  const imgUrl = 'https://demo-app.vwbl-protocol.org/ogp.png';
  const imgWidth = 2400;
  const imgHeight = 1260;

  return (
    <>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={`${imgWidth}`} />
      <meta property='og:image:height' content={`${imgHeight}`} />
      <meta name='twitter:card' content='summary_large_image' />
    </>
  );
};
Ogp.displayName = 'Ogp';
