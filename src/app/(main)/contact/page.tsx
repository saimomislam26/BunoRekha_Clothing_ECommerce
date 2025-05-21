import ContactForm from '@/components/sections/contact/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-2">
          We'd love to hear from you. Reach out with any questions or inquiries.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="bg-card p-8 rounded-lg shadow-lg space-y-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h2>
          
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Our Address</h3>
              <p className="text-muted-foreground">
                123 Weave Street, Style City, SC 54321, Fashionland
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Email Us</h3>
              <a href="mailto:support@bunorekha.com" className="text-muted-foreground hover:text-primary transition-colors">
                support@bunorekha.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
               <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Call Us</h3>
              <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Placeholder for Map */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-foreground mb-3">Find Us Here</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {/* Replace with actual map embed (e.g., Google Maps iframe) */}
              <p className="text-sm text-muted-foreground">Map placeholder</p>
              <Image src="https://placehold.co/600x400/404040/E6B84A.png?text=Visit+Us" alt="Location map placeholder" width={600} height={400} className="opacity-50" data-ai-hint="map location" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
