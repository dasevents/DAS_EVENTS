import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import 'altcha';
import { contactInfo, eventTypes } from '../../data/contact';
import { useContactForm } from '../../hooks/useContactForm';
import Container from '../ui/container';
import SectionHeader from '../ui/section-header';
import Button from '../ui/button';
import Input from '../ui/input';
import Textarea from '../ui/textarea';
import Select from '../ui/select';

function ContactFormSection() {
  const {
    formData,
    errors,
    touched,
    submitted,
    submitting,
    error,
    altchaVerified,
    widgetRef,
    handleChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  return (
    <section className="py-[var(--space-section)] bg-bg-section">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <SectionHeader
              tag="Send a Message"
              title="Drop Us a Line"
              description="Tell us about your event and we'll get back to you within 24 hours."
              align="left"
            />
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-12 gap-4"
              >
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="text-xl font-semibold text-text-main">Thank you, {formData.name}!</h3>
                <p className="text-text-secondary max-w-md">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <Button variant="outline" onClick={resetForm}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Phone (WhatsApp)"
                  name="phone"
                  type="tel"
                  placeholder="+91 95910 36303"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && errors.phone}
                  required
                />
                <Select
                  label="Event Type"
                  name="eventType"
                  value={formData.eventType}
                  onChange={(val) => handleSelectChange('eventType', val)}
                  options={eventTypes.map((t) => ({ value: t, label: t }))}
                  placeholder="Select event type"
                  error={touched.eventType && errors.eventType}
                  required
                />
              </div>
              <Textarea
                label="Message"
                name="message"
                placeholder="Tell us about your event..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.message && errors.message}
                required
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <altcha-widget
                  ref={widgetRef}
                  name="altcha"
                  hideFooter="true"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={submitting ? Loader2 : Send}
                  iconPosition="right"
                  disabled={submitting || !altchaVerified}
                  className={`sm:w-auto w-full ${submitting || !altchaVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
            </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="[font-family:var(--font-title)] text-lg font-semibold text-text-main mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon size={18} className="text-primary" />
                    </span>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">{info.label}</div>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-medium text-text-main hover:text-primary transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-text-main">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default ContactFormSection;
