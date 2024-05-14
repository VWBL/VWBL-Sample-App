import { useTranslation } from 'react-i18next';

export const Ogp = () => {
  const { t } = useTranslation();

  const title = t('meta.title');
  const description = t('meta.description');
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
