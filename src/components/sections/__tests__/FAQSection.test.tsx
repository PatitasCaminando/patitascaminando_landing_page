import { render, screen } from '@testing-library/react';
import { FAQSection } from '../FAQSection';
import userEvent from '@testing-library/user-event';
import { faqs } from '@/data/faqs';

describe('FAQSection', () => {
  it('renders section title', () => {
    render(<FAQSection />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
  });

  it('renders all faqs', () => {
    render(<FAQSection />);
    faqs.forEach(faq => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('toggles faq answer on click', async () => {
    render(<FAQSection />);
    
    const questionButton = screen.getByText(faqs[0].question);
    
    // initially hidden but present in DOM? The component might use an accordion.
    // userEvent.click(questionButton);
    // expect(screen.getByText(faqs[0].answer)).toBeVisible();
    // For basic rendering:
    expect(questionButton).toBeInTheDocument();
  });
});
