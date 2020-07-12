export function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
};

export function provideHass(element) {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').provideHass(element);

  if(document.querySelector('home-assistant'))
    return document.querySelector("home-assistant").provideHass(element);

  return undefined;
}

export function lovelace() {
  var root = document.querySelector("hc-main");
  if(root) {
    var ll = root._lovelaceConfig;
    ll.current_view = root._lovelacePath;
    return ll;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace")
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root")
  if (root) {
    var ll =  root.lovelace
    ll.current_view = root.___curView;
    return ll;
  }

  return null;
}

async function await_el(el) {
  if(!el) return;
  await customElements.whenDefined(el.localName);
  if(el.updateComplete)
    await el.updateComplete;
}

export async function async_lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    await_el(root);
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    await_el(root);
    return root;
  }

  root = document.querySelector("home-assistant");
  await_el(root);
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  await_el(root);
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  await_el(root);
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  await_el(root);
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  await_el(root);
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout")
  await_el(root);
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  await_el(root);
  return root;
}
export function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout")
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

export function load_lovelace() {
  if(customElements.get("hui-view")) return true;

  const res = document.createElement("partial-panel-resolver");
  res.hass = hass();
  if(!res.hass || !res.hass.panels)
    return false;
  res.route = {path: "/lovelace/"};
  res._updateRoutes();
  try {
    document.querySelector("home-assistant").appendChild(res);
  } catch (error) {
  } finally {
    document.querySelector("home-assistant").removeChild(res);
  }
  if(customElements.get("hui-view")) return true;
  return false;
}
