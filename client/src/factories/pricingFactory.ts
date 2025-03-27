import React from 'react';

export type BillingCycle = 'monthly' | 'annual' | 'quarterly' | 'lifetime';

export interface PricingFeature {
  id: string;
  name: string;
  description?: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingTierFactoryProps {
  id: string;
  name: string;
  description: string;
  prices: Record<BillingCycle, number>;
  discountPercentage?: Record<BillingCycle, number>;
  features: PricingFeature[];
  primary?: boolean;
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  icon?: React.ReactNode;
  badge?: string;
  color?: string;
}

export interface PricingFactoryProps {
  title: string;
  subtitle?: string;
  tiers: PricingTierFactoryProps[];
  defaultBillingCycle: BillingCycle;
  availableBillingCycles: BillingCycle[];
  comparisonTable?: boolean;
  currency?: string;
  highlights?: string[];
  faqItems?: { question: string; answer: string }[];
}

export function createPricingTier(props: PricingTierFactoryProps) {
  return {
    ...props,
    isPrimary: !!props.primary,
    isPopular: !!props.popular,
    hasBadge: !!props.badge,
    hasIcon: !!props.icon,
    getFormattedPrice: (cycle: BillingCycle, currencyCode = 'USD') => {
      const price = props.prices[cycle] || 0;
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currencyCode,
        minimumFractionDigits: price % 1 === 0 ? 0 : 2
      }).format(price);
    },
    getDiscountedPrice: (cycle: BillingCycle, currencyCode = 'USD') => {
      if (!props.discountPercentage?.[cycle]) return null;
      
      const price = props.prices[cycle] || 0;
      const discount = props.discountPercentage[cycle] / 100;
      const discountedPrice = price * (1 - discount);
      
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currencyCode,
        minimumFractionDigits: discountedPrice % 1 === 0 ? 0 : 2
      }).format(discountedPrice);
    },
    getSavingsAmount: (cycle: BillingCycle, currencyCode = 'USD') => {
      if (!props.discountPercentage?.[cycle]) return null;
      
      const price = props.prices[cycle] || 0;
      const discount = props.discountPercentage[cycle] / 100;
      const savingsAmount = price * discount;
      
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currencyCode,
        minimumFractionDigits: savingsAmount % 1 === 0 ? 0 : 2
      }).format(savingsAmount);
    },
    getIncludedFeatures: () => {
      return props.features.filter(f => f.included);
    },
    getExcludedFeatures: () => {
      return props.features.filter(f => !f.included);
    },
    getHighlightedFeatures: () => {
      return props.features.filter(f => f.highlight);
    },
    getColorClass: () => {
      return props.color || (props.isPrimary ? 'primary' : props.isPopular ? 'secondary' : 'default');
    }
  };
}

export function createPricing(props: PricingFactoryProps) {
  const pricingTiers = props.tiers.map(tier => createPricingTier(tier));
  
  return {
    ...props,
    tiers: pricingTiers,
    hasComparison: !!props.comparisonTable,
    hasFAQ: !!(props.faqItems && props.faqItems.length > 0),
    hasHighlights: !!(props.highlights && props.highlights.length > 0),
    getFormattedBillingCycle: (cycle: BillingCycle) => {
      switch (cycle) {
        case 'monthly': return 'Monthly';
        case 'quarterly': return 'Quarterly';
        case 'annual': return 'Annually';
        case 'lifetime': return 'Lifetime';
        default: return cycle;
      }
    },
    getBillingCycleDescription: (cycle: BillingCycle) => {
      switch (cycle) {
        case 'monthly': return 'Billed monthly';
        case 'quarterly': return 'Billed every 3 months';
        case 'annual': return 'Billed annually (save 20%)';
        case 'lifetime': return 'One-time payment';
        default: return '';
      }
    },
    getCurrencySymbol: () => {
      const currencyCode = props.currency || 'USD';
      try {
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: currencyCode
        }).formatToParts(0).find(part => part.type === 'currency')?.value || '$';
      } catch (e) {
        return '$';
      }
    },
    getAllFeatures: () => {
      const allFeatures = new Map<string, PricingFeature>();
      
      pricingTiers.forEach(tier => {
        tier.features.forEach(feature => {
          if (!allFeatures.has(feature.id)) {
            allFeatures.set(feature.id, feature);
          }
        });
      });
      
      return Array.from(allFeatures.values());
    },
    getPopularTier: () => {
      return pricingTiers.find(tier => tier.isPopular);
    }
  };
}