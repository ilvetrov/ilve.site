function defaultData(instance) {
  return {
    title: instance.$t('ilia_vetrov') + '. ' + instance.$t('web_development'),
    description: instance.$t('_about_site')
  }
}

export default function getHead(instance, data = {}, advanced = {}) {
  data = {...defaultData(instance), ...data}
  return {
    title: data.title,
    meta: [
			{ hid: 'description', name: 'description', content: data.description },
      { property: 'og:site_name', content: process.env.SITE_NAME },
      { property: 'og:title', content: data.title },
      { property: 'twitter:title', content: data.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: process.env.SITE_URL + instance.$route.path },
      { property: 'og:image', content: '{{ mainImage }}' },
      { property: 'twitter:image', content: '{{ mainImage }}' },
      { property: 'og:image:width', content: '{{ mainImageSize.width }}' },
      { property: 'og:image:height', content: '{{ mainImageSize.height }}' },
      { property: 'og:description', content: data.description },
      { property: 'twitter:description', content: data.description },
    ],
    ...advanced
  }
}