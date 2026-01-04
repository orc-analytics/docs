import React, {type ReactNode, useState, useEffect} from 'react';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps): ReactNode {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`footer__toast footer__toast--${type}`}>
      <div className="footer__toast-content">
        <span className="footer__toast-icon">
          {type === 'success' ? '✓' : '✕'}
        </span>
        <span className="footer__toast-message">{message}</span>
        <button 
          className="footer__toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function NewsletterSignup(): ReactNode {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const endpoint = '/.netlify/functions/newsletter-signup'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formtype: 'orca',
          email: email
        })
      });
    
      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Successfully subscribed!', type: 'success' });
        setEmail('');
      } else {
        setToast({ 
          message: data.error || 'Something went wrong. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="footer__newsletter" id="newsletter">
      <div className="container">
        <h3>Subscribe to our newsletter</h3>
        <p>Get the latest updates delivered to your inbox</p>
        <form 
          onSubmit={handleSubmit}
          className="footer__newsletter-form"
        >
          <input
            type="text"
            name="formtype"
            value="orca"
            readOnly
            className='footer__newsletter-hidden-input'
          />
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required 
            className="footer__newsletter-input"
            disabled={isSubmitting}
          />
          <button 
            type="submit"
            className="footer__newsletter-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <>
      <NewsletterSignup />
      <FooterLayout
        style={style}
        links={links && links.length > 0 && <FooterLinks links={links} />}
        logo={logo && <FooterLogo logo={logo} />}
        copyright={copyright && <FooterCopyright copyright={copyright} />}
      />
    </>
  );
}

export default React.memo(Footer);
