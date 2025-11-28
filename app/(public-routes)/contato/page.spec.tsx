import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './page';
import emailjs from '@emailjs/browser';

// Mock the emailjs library
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn()
}));

// Mock environment variables
const mockServiceId = 'mock_service_id';
const mockTemplateId = 'mock_template_id';
const mockPublicKey = 'mock_public_key';

describe('Contact Component', () => {
  // Setup environment variables before each test
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVICE_ID = mockServiceId;
    process.env.NEXT_PUBLIC_TEMPLATE_ID = mockTemplateId;
    process.env.NEXT_PUBLIC_PUBLIC_KEY = mockPublicKey;
  });

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact form with all elements', () => {
    render(<Contact />);

    // Check if all input fields are present
    expect(screen.getByTestId('input-Nome')).toBeInTheDocument();
    expect(screen.getByTestId('input-E-Mail')).toBeInTheDocument();
    expect(screen.getByTestId('input-Assunto')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-Mensagem')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('allows input in all form fields', () => {
    render(<Contact />);

    const nameInput = screen.getByTestId('input-Nome') as HTMLInputElement;
    const emailInput = screen.getByTestId('input-E-Mail') as HTMLInputElement;
    const subjectInput = screen.getByTestId('input-Assunto') as HTMLInputElement;
    const messageInput = screen.getByTestId('textarea-Mensagem') as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(subjectInput.value).toBe('Test Subject');
    expect(messageInput.value).toBe('Test Message');
  });

  test('submits form successfully', async () => {
    // Mock successful email sending
    (emailjs.sendForm as jest.Mock).mockResolvedValue({});

    render(<Contact />);

    const nameInput = screen.getByTestId('input-Nome');
    const emailInput = screen.getByTestId('input-E-Mail');
    const subjectInput = screen.getByTestId('input-Assunto');
    const messageInput = screen.getByTestId('textarea-Mensagem');
    const submitButton = screen.getByTestId('submit-button');

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    // Submit the form
    act(() => {
      fireEvent.click(submitButton);
    });

    // Wait for success message
    await waitFor(() => {
      const successMessage = screen.getByTestId('success-message');
      expect(successMessage).toBeInTheDocument();
    });

    // Check if emailjs.sendForm was called
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      mockServiceId,
      mockTemplateId,
      expect.any(HTMLFormElement),
      mockPublicKey
    );
  });

  test('handles form submission error', async () => {
    // Mock email sending error
    (emailjs.sendForm as jest.Mock).mockRejectedValue(new Error('Send failed'));

    render(<Contact />);

    const nameInput = screen.getByTestId('input-Nome');
    const emailInput = screen.getByTestId('input-E-Mail');
    const subjectInput = screen.getByTestId('input-Assunto');
    const messageInput = screen.getByTestId('textarea-Mensagem');
    const submitButton = screen.getByTestId('submit-button');

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    // Submit the form
    act(() => {
      fireEvent.click(submitButton);
    });

    // Wait for error message
    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
    });

    // Verify error state
    expect(screen.getByText('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.')).toBeInTheDocument();
  });

  test('submit button is disabled during loading', () => {
    // Mock a slow email sending process
    (emailjs.sendForm as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<Contact />);

    const nameInput = screen.getByTestId('input-Nome');
    const emailInput = screen.getByTestId('input-E-Mail');
    const subjectInput = screen.getByTestId('input-Assunto');
    const messageInput = screen.getByTestId('textarea-Mensagem');
    const submitButton = screen.getByTestId('submit-button');

    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    // Submit the form
    act(() => {
      fireEvent.click(submitButton);
    });

    // Check if submit button is disabled
    expect(submitButton).toBeDisabled();
  });
});