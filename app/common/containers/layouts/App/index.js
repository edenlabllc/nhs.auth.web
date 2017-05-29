import React from 'react';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import { SITEMAP_HOSTNAME } from 'config';
import { fetchDictionaries } from 'redux/dictionaries';

@provideHooks({
  fetch: ({ dispatch }) => dispatch(fetchDictionaries({}, { useCache: true })),
})
export default class App extends React.Component {
  render() {
    const { children, location } = this.props;
    return (<div>
      <Helmet
        htmlAttributes={{ lang: 'ru', amp: undefined }} // amp takes no value
        titleTemplate="Національна служба здоров'я - %s"
        defaultTitle="Національна служба здоров'я"
        link={[
          { rel: 'canonical', href: `${SITEMAP_HOSTNAME}${location.pathname}` },
          { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
          { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
          { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#2c83b5' },
          { rel: 'shortcut icon', href: '/favicon.ico?v=1' },
        ]}
        meta={[
          { charset: 'utf-8' },
          { name: 'format-detection', content: 'telephone=no' },
          { name: 'keywords', content: 'національна служба здоров\'я, моз, україна, здоров\'я, лікар, авторизація, регистрація' },
          { name: 'description', content: 'Портал авторизації ДП "Національна служа здоров\'я". На ньому ви можете зареэструватися як лікар, прийняти запрошення від клініки та надати доступ до своїх даних.' },
          { property: 'og:title', content: 'Національна служба здоров\'я. Портал авторизації' },
          { property: 'og:site_name', content: 'Національна служба здоров\'я. Портал авторизації' },
          { property: 'og:description', content: 'Портал авторизації ДП "Національна служа здоров\'я". На ньому ви можете зареэструватися як лікар, прийняти запрошення від клініки та надати доступ до своїх даних.' },
          { name: 'apple-mobile-web-app-title', content: 'Національна служа здоров\'я' },
          { name: 'application-name', content: 'Національна служа здоров\'я' },
          { name: 'msapplication-TileColor', content: '#2b5797' },
          { name: 'theme-color', content: '#ffffff' },
          { name: 'apple-mobile-web-app-title', content: 'P2Y' },
          { name: 'application-name', content: 'NHS Auth' },
          { name: 'msapplication-TileColor', content: '#2b5797' },
          { name: 'msapplication-TileImage', content: '/mstile-144x144.png' },
          { name: 'msapplication-config', content: '/browserconfig.xml' },
          { name: 'theme-color', content: '#ffffff' },
        ]}
      />
      { children }
    </div>);
  }
}
