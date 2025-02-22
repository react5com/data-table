import "./styles/1-color-vars.scss";
import "./index.scss";
export * from "./components";
import { addTranslations } from "./i18n";
addTranslations();

// const b = bem("lib-component");
// export const LibComponent = () => {
//   const { t, i18n } = useTranslation(translationNs);

//   return (
//     <div className={b()}>
//       <h1 className={b("title")}>Hello from Lib</h1>
//       <p className={b("description")}>This is a component from the lib package</p>
//       <a className={b("link")} href="/">Get Started</a>
//       <a className={b("link")} href="/">{t("core.settings")}</a>
//     </div>
//   )
// }
