'use client';

import { useCallback } from 'react';
import { FACEBOOK_PIXEL_CONFIG, FACEBOOK_EVENTS } from '../config/facebookPixel';

declare global {
  interface Window {
    fbq: any;
  }
}

export const useFacebookPixel = () => {
  const trackEvent = useCallback((eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  }, []);

  const trackPurchase = useCallback((value: number = FACEBOOK_PIXEL_CONFIG.PRODUCT_PRICE, currency: string = FACEBOOK_PIXEL_CONFIG.CURRENCY) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.PURCHASE, {
        value: value,
        currency: currency,
        content_name: FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME,
        content_category: FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY,
      });
    }
  }, []);

  const trackAddToCart = useCallback((value: number = FACEBOOK_PIXEL_CONFIG.PRODUCT_PRICE, currency: string = FACEBOOK_PIXEL_CONFIG.CURRENCY) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.ADD_TO_CART, {
        value: value,
        currency: currency,
        content_name: FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME,
        content_category: FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY,
      });
    }
  }, []);

  const trackInitiateCheckout = useCallback((value: number = FACEBOOK_PIXEL_CONFIG.PRODUCT_PRICE, currency: string = FACEBOOK_PIXEL_CONFIG.CURRENCY) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.INITIATE_CHECKOUT, {
        value: value,
        currency: currency,
        content_name: FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME,
        content_category: FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY,
      });
    }
  }, []);

  const trackLead = useCallback(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.LEAD, {
        content_name: FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME,
        content_category: FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY,
      });
    }
  }, []);

  const trackViewContent = useCallback((contentName: string = FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME, contentCategory: string = FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.VIEW_CONTENT, {
        content_name: contentName,
        content_category: contentCategory,
        value: FACEBOOK_PIXEL_CONFIG.PRODUCT_PRICE,
        currency: FACEBOOK_PIXEL_CONFIG.CURRENCY,
      });
    }
  }, []);

  const trackCompleteRegistration = useCallback(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', FACEBOOK_EVENTS.COMPLETE_REGISTRATION, {
        content_name: FACEBOOK_PIXEL_CONFIG.PRODUCT_NAME,
        content_category: FACEBOOK_PIXEL_CONFIG.PRODUCT_CATEGORY,
      });
    }
  }, []);

  return {
    trackEvent,
    trackPurchase,
    trackAddToCart,
    trackInitiateCheckout,
    trackLead,
    trackViewContent,
    trackCompleteRegistration,
  };
};
