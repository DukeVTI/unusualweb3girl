import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = (data) => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors
            ${errors.name 
              ? 'border-red-400 focus:border-red-400' 
              : 'border-gray-200 dark:border-gray-800 focus:border-emerald-400'
            } 
            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100 
            placeholder:text-gray-400 dark:placeholder:text-gray-500`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors
            ${errors.email 
              ? 'border-red-400 focus:border-red-400' 
              : 'border-gray-200 dark:border-gray-800 focus:border-emerald-400'
            } 
            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100 
            placeholder:text-gray-400 dark:placeholder:text-gray-500`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Message Input */}
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none
            ${errors.message 
              ? 'border-red-400 focus:border-red-400' 
              : 'border-gray-200 dark:border-gray-800 focus:border-emerald-400'
            } 
            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100 
            placeholder:text-gray-400 dark:placeholder:text-gray-500`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-400 hover:bg-emerald-500 disabled:bg-emerald-300 
          disabled:cursor-not-allowed text-gray-900 py-3 rounded-lg transition-colors 
          font-medium flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <p>Message sent successfully! We'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>Failed to send message. Please try again later.</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;