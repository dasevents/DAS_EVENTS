const GA_MEASUREMENT_ID = 'G-CKGD21LXS2';

export function grantAnalyticsConsent() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

export function denyAnalyticsConsent() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
  });
}

export function grantMarketingConsent() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
  });
}

export function denyMarketingConsent() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage: 'denied',
  });
}

export function trackPageView(pagePath, pageTitle) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
}
