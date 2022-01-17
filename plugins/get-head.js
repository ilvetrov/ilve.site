function defaultData(instance) {
  return {
    title: instance.$t('ilia_vetrov') + '. ' + instance.$t('web_development'),
    description: instance.$t('_about_site'),
    image: {
      url: '/img/home-face.jpg',
      width: 300,
      height: 300,
    }
  }
}

export default function getHead(instance, data = {}, advanced = {}, onlyRewritable = false) {
  data = {...defaultData(instance), ...data}
  return {
    title: data.title,
    meta: [
			{ hid: 'description', name: 'description', content: data.description },
      ...(onlyRewritable ? [] : [
        { property: 'og:site_name', content: process.env.SITE_NAME },
        { property: 'og:title', content: data.title },
        { property: 'twitter:title', content: data.title },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.SITE_URL + instance.$route.path },
        { property: 'og:image', content: process.env.SITE_URL + data.image.url },
        { property: 'twitter:image', content: process.env.SITE_URL + data.image.url },
        { property: 'og:image:width', content: data.image.width },
        { property: 'og:image:height', content: data.image.height },
        { property: 'og:description', content: data.description },
        { property: 'twitter:description', content: data.description }
      ]),
    ],
    ...advanced
  }
}