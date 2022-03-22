import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom";
import { createElement, useState } from "react";
import { ReactSitesContext, routes } from "yext-sites-scripts";

export const App = ({ page }) => {
    let [activePage, setActivePage] = useState(page);
    return (_jsx(ReactSitesContext.Provider, { value: { activePage, setActivePage }, children: createElement(activePage?.component, activePage?.props) }));
};
const hydrate = async () => {
    /**
     * Get the templateFilename from the template. See {@link ./ssr/serverRenderRoute.ts}.
     */
    const templateFilename = window._RSS_TEMPLATE_.split('.')[0];
    console.log(routes);

    const { default: component } = await routes.find((route) => route.name === templateFilename)?.getComponent();
    ReactDOM.hydrate(_jsx(App, { page: {
            props: window._RSS_PROPS_,
            path: window.location.pathname,
            component: component,
        } }), document.getElementById("root"));
};
//@ts-ignore
if (!import.meta.env.SSR)
    hydrate();
