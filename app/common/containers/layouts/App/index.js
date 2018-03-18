import React from "react";
import Helmet from "react-helmet";
import { SITEMAP_HOSTNAME } from "../../../config";

export default class App extends React.Component {
  render() {
    const { children, location } = this.props;
    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: "ru", amp: undefined }} // amp takes no value
          titleTemplate="Електронна система охорони здоров'я eHealth - %s"
          defaultTitle="Електронна система охорони здоров'я eHealth"
          link={[
            {
              rel: "canonical",
              href: `${SITEMAP_HOSTNAME}${location.pathname}`
            },
            {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: "/apple-touch-icon.png"
            },
            {
              rel: "icon",
              type: "image/png",
              href: "/favicon-32x32.png",
              sizes: "32x32"
            },
            {
              rel: "icon",
              type: "image/png",
              href: "/favicon-16x16.png",
              sizes: "16x16"
            },
            { rel: "manifest", href: "/manifest.json" },
            {
              rel: "mask-icon",
              href: "/safari-pinned-tab.svg",
              color: "#2c83b5"
            },
            { rel: "shortcut icon", href: "/favicon.ico?v=4" }
          ]}
          meta={[
            { charset: "utf-8" },
            { name: "format-detection", content: "telephone=no" },
            {
              name: "keywords",
              content:
                "eлектронна система охорони здоров'я, eHealth, моз, україна, здоров'я, лікар, авторизація, регистрація"
            },
            {
              name: "description",
              content:
                "Портал авторизації Електронної система охорони здоров'я eHealth. На ньому ви можете зареэструватися як лікар, прийняти запрошення від клініки та надати доступ до своїх даних."
            },
            {
              property: "og:title",
              content:
                "Електронна система охорони здоров'я eHealth. Портал авторизації"
            },
            {
              property: "og:site_name",
              content:
                "Електронна система охорони здоров'я eHealth. Портал авторизації"
            },
            {
              property: "og:description",
              content:
                "Портал авторизації Електронної системи охорони здоров'я eHealth. На ньому ви можете зареэструватися як лікар, прийняти запрошення від клініки та надати доступ до своїх даних."
            },
            {
              name: "apple-mobile-web-app-title",
              content: "Електронна система охорони здоров'я eHealth"
            },
            {
              name: "application-name",
              content: "Електронна система охорони здоров'я eHealth"
            },
            { name: "msapplication-TileColor", content: "#2b5797" },
            { name: "theme-color", content: "#ffffff" },
            { name: "apple-mobile-web-app-title", content: "eHealth" },
            { name: "application-name", content: "eHealth. Auth" },
            { name: "msapplication-TileColor", content: "#2b5797" },
            { name: "msapplication-TileImage", content: "/mstile-144x144.png" },
            { name: "msapplication-config", content: "/browserconfig.xml" },
            { name: "theme-color", content: "#ffffff" }
          ]}
        />
        {children}
      </div>
    );
  }
}
