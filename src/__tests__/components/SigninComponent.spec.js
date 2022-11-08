import { createEvent, fireEvent, getByRole, render, screen, act } from '@testing-library/react';
import SigninComponent from '../../components/SigninComponent';

describe('Tests for authentication', () => {
  it('should display welcome to money-thunes', () => {
    render(<SigninComponent />);
    const welcomeElement = screen.getByText(/Welcome to money-thunes/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  // it('should display an email input', () => {
  //   render(<SigninComponent />);
  //   const emailInput = screen.getByTestId('signin-email');
  //   expect(emailInput).toBeInTheDocument();
  // });

  // it('should display a password input', () => {
  //   render(<SigninComponent />);
  //   const passwordInput = screen.getByTestId('signin-password');
  //   expect(passwordInput).toBeInTheDocument();
  // });

  it.skip('should display a submit button', () => {
    render(<SigninComponent />);
    const submitButton = screen.getByTestId('connectButton');
    expect(submitButton).toBeInTheDocument();
  });

  // it('should display error when email is not defined', async () => {
  //   render(<SigninComponent />);
  //   const connectButton = screen.getByTestId('connectButton');
  //   await act(() => fireEvent.click(connectButton));
  //   await new Promise((resolve) => setTimeout(resolve, 20));
  //   const errorMessage = screen.getByTestId('email-error');
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('should display error when password is not defined', async () => {
  //   render(<SigninComponent />);
  //   const connectButton = screen.getByTestId('connectButton');
  //   fireEvent.click(connectButton);
  //   await new Promise((resolve) => setTimeout(resolve, 20));
  //   const errorMessage = screen.getByTestId('password-error');
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('should disabled button if form is empty', () => {
  //   render(<SigninComponent />);
  //   const submitButton = screen.getByRole('button');
  //   expect(submitButton).toBeInTheDocument();
  // });
});
