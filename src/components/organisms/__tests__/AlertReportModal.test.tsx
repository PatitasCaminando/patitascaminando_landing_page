import { render, screen, fireEvent } from '@testing-library/react';
import { AlertReportModal } from '../AlertReportModal';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('AlertReportModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders informative modal with social networks', async () => {
    render(<AlertReportModal isOpen={true} onClose={mockOnClose} />);

    expect(await screen.findByText('Reportar un caso')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    render(<AlertReportModal isOpen={true} onClose={mockOnClose} />);

    const closeBtn = await screen.findByLabelText('Cerrar modal');
    await userEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    render(<AlertReportModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Reportar un caso')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    render(<AlertReportModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on other key presses', () => {
    render(<AlertReportModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    render(<AlertReportModal isOpen={true} onClose={mockOnClose} />);
    const overlay = document.querySelector('.fixed.inset-0.bg-\\[\\#153970\\]\\/30');
    if (overlay) fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
