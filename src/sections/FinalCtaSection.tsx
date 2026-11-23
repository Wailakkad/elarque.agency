import React, { useRef, useState } from 'react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Monogram } from '../components/Monogram';
import { SHEETS_ENDPOINT, getWhatsAppUrl } from '../config';
import { Dictionary, Locale } from '../i18n';

interface FinalCtaSectionProps {
  t: Dictionary['finalCta'];
  locale: Locale;
}

interface FormValues {
  name: string;
  email: string;
  brandLink: string;
  productDetails: string;
  message: string;
  honeypot: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  brandLink: '',
  productDetails: '',
  message: '',
  honeypot: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  t,
  locale,
}) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const pageLoadedAtRef = useRef<number>(Date.now());

  const validate = (next: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!next.name.trim()) {
      nextErrors.name = t.errors.nameRequired;
    }
    if (!next.email.trim()) {
      nextErrors.email = t.errors.emailRequired;
    } else if (!EMAIL_REGEX.test(next.email.trim())) {
      nextErrors.email = t.errors.emailInvalid;
    }
    if (!next.brandLink.trim()) {
      nextErrors.brandLink = t.errors.brandRequired;
    }
    if (!next.productDetails.trim()) {
      nextErrors.productDetails = t.errors.productRequired;
    }
    return nextErrors;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'submitting') {
      return;
    }

    // Spam honeypot check: silently acknowledge bot submissions
    if (values.honeypot.trim().length > 0) {
      setStatus('success');
      setValues(INITIAL_VALUES);
      setErrors({});
      return;
    }

    // Submitted less than 3s after page load: treat as spam, do not send
    if (Date.now() - pageLoadedAtRef.current < 3000) {
      setStatus('success');
      setValues(INITIAL_VALUES);
      setErrors({});
      return;
    }

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');

    try {
      if (!SHEETS_ENDPOINT) {
        throw new Error('Sheets endpoint not configured');
      }

      // application/x-www-form-urlencoded — no Content-Type header (avoids CORS preflight)
      const body = new URLSearchParams({
        name: values.name.trim(),
        email: values.email.trim(),
        brand: values.brandLink.trim(),
        product: values.productDetails.trim(),
        message: values.message.trim(),
        lang: locale,
        page: window.location.href,
        company_website: values.honeypot.trim(),
      });

      const response = await fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        body,
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      const result: unknown = await response.json();
      const payload = result as { ok?: boolean; error?: string };
      if (!payload || payload.ok !== true) {
        throw new Error(payload?.error || 'Submission rejected');
      }

      setStatus('success');
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const fallbackWhatsAppMessage = values.name
    ? `Hi ELARQUE, I'd like a free 3-concept sample.\nName: ${values.name}\nBrand: ${values.brandLink}\nProduct: ${values.productDetails}`
    : t.whatsappDefaultMessage;

  return (
    <Section
      id="sample"
      labelledBy="sample-heading"
      surface="umber"
      className="overflow-hidden"
    >
      {/* Faint 6% opacity decorative monogram cropped large behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-24 top-1/2 -translate-y-1/2 text-alabaster opacity-[0.06]"
      >
        <Monogram className="w-[460px] h-[460px] sm:w-[560px] sm:h-[560px]" decorative />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="sample-heading" className="text-alabaster">
            {t.headingBefore}
            <em>{t.headingItalic}</em>
            {t.headingAfter}
          </h2>
          <p className="mt-5 text-[17px] sm:text-[18px] leading-[1.6] text-alabaster/85">
            {t.body}
          </p>
        </div>

        <div className="mt-10 sm:mt-12 max-w-xl mx-auto">
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-sand text-umber rounded-[2px] border-t-2 border-sage p-8 sm:p-10 text-center"
            >
              <p className="micro-label text-sage">Request received</p>
              <p className="font-display text-2xl sm:text-3xl text-umber mt-3">
                {t.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Hidden honeypot field — not display:none; kept out of the a11y tree */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="sample-company-website">Leave this field empty</label>
                <input
                  id="sample-company-website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.honeypot}
                  onChange={(e) => handleChange('honeypot', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="sample-name"
                    className="block micro-label text-alabaster/85 mb-2"
                  >
                    {t.fields.name}
                  </label>
                  <input
                    id="sample-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t.fields.namePlaceholder}
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'sample-name-error' : undefined}
                    className="w-full px-4 py-3 rounded-[2px] bg-alabaster text-umber placeholder:text-umber/45 border border-travertine focus:outline-2 focus:outline-terracotta"
                  />
                  {errors.name && (
                    <p
                      id="sample-name-error"
                      role="alert"
                      className="mt-1.5 text-[13px] text-petal"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="sample-email"
                    className="block micro-label text-alabaster/85 mb-2"
                  >
                    {t.fields.email}
                  </label>
                  <input
                    id="sample-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t.fields.emailPlaceholder}
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'sample-email-error' : undefined}
                    className="w-full px-4 py-3 rounded-[2px] bg-alabaster text-umber placeholder:text-umber/45 border border-travertine focus:outline-2 focus:outline-terracotta"
                  />
                  {errors.email && (
                    <p
                      id="sample-email-error"
                      role="alert"
                      className="mt-1.5 text-[13px] text-petal"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="sample-brand"
                  className="block micro-label text-alabaster/85 mb-2"
                >
                  {t.fields.brandLink}
                </label>
                <input
                  id="sample-brand"
                  name="brandLink"
                  type="text"
                  required
                  placeholder={t.fields.brandLinkPlaceholder}
                  value={values.brandLink}
                  onChange={(e) => handleChange('brandLink', e.target.value)}
                  aria-invalid={Boolean(errors.brandLink)}
                  aria-describedby={errors.brandLink ? 'sample-brand-error' : undefined}
                  className="w-full px-4 py-3 rounded-[2px] bg-alabaster text-umber placeholder:text-umber/45 border border-travertine focus:outline-2 focus:outline-terracotta"
                />
                {errors.brandLink && (
                  <p
                    id="sample-brand-error"
                    role="alert"
                    className="mt-1.5 text-[13px] text-petal"
                  >
                    {errors.brandLink}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sample-product"
                  className="block micro-label text-alabaster/85 mb-2"
                >
                  {t.fields.productDetails}
                </label>
                <input
                  id="sample-product"
                  name="productDetails"
                  type="text"
                  required
                  placeholder={t.fields.productDetailsPlaceholder}
                  value={values.productDetails}
                  onChange={(e) => handleChange('productDetails', e.target.value)}
                  aria-invalid={Boolean(errors.productDetails)}
                  aria-describedby={
                    errors.productDetails ? 'sample-product-error' : undefined
                  }
                  className="w-full px-4 py-3 rounded-[2px] bg-alabaster text-umber placeholder:text-umber/45 border border-travertine focus:outline-2 focus:outline-terracotta"
                />
                {errors.productDetails && (
                  <p
                    id="sample-product-error"
                    role="alert"
                    className="mt-1.5 text-[13px] text-petal"
                  >
                    {errors.productDetails}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sample-message"
                  className="block micro-label text-alabaster/85 mb-2"
                >
                  {t.fields.message}{' '}
                  <span className="text-alabaster/60 normal-case tracking-normal">
                    {t.fields.messageOptionalTag}
                  </span>
                </label>
                <textarea
                  id="sample-message"
                  name="message"
                  rows={3}
                  placeholder={t.fields.messagePlaceholder}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="w-full px-4 py-3 rounded-[2px] bg-alabaster text-umber placeholder:text-umber/45 border border-travertine focus:outline-2 focus:outline-terracotta resize-y"
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-[2px] bg-alabaster text-umber border-t-2 border-terracotta text-[14px] space-y-2"
                >
                  <p>{t.errors.submitFailed}</p>
                  <p>
                    <a
                      href={getWhatsAppUrl(fallbackWhatsAppMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta-hover font-medium underline underline-offset-4"
                    >
                      {t.fallbackWhatsappLabel}
                    </a>
                  </p>
                </div>
              )}

              <div className="pt-2 text-center space-y-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? t.submittingButton : t.submitButton}
                </Button>

                <p className="micro-label text-alabaster/70">{t.consent}</p>

                <p className="micro-label text-alabaster/70">{t.reassurance}</p>

                <p className="text-[15px] text-alabaster/85 pt-2">
                  {t.whatsappPrompt}{' '}
                  <a
                    href={getWhatsAppUrl(t.whatsappDefaultMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-alabaster underline underline-offset-4 decoration-brass hover:text-sand transition-colors"
                  >
                    {t.whatsappLinkLabel}
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
};
