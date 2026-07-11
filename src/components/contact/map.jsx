import Container from '../ui/container';

function MapSection() {
  return (
    <section className="py-[var(--space-section)] bg-bg-main">
      <Container>
        <div className="rounded-2xl overflow-hidden border border-border/50 h-96 bg-bg-main">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985639443045!2d77.58962397482193!3d13.010533887304982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14f7e2b0a6d9%3A0x6e7c7b8b8b8b8b8b!2sRT%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DAS EVENTS Location"
          />
        </div>
      </Container>
    </section>
  );
}

export default MapSection;
