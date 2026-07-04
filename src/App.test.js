import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App registration form', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ message: 'success' }),
      })
    );
  });

  test('sends Batch-1 to the backend when year 3 is selected', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    expect(container.querySelector('select[name="year"]')).not.toBeNull();

    await user.selectOptions(screen.getByRole('combobox', { name: /year/i }), '3');
    await user.selectOptions(screen.getByRole('combobox', { name: /batch/i }), 'CSE-A');
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Test User');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
    await user.type(screen.getByRole('textbox', { name: /register number/i }), '12345');
    await user.type(screen.getByRole('textbox', { name: /phone number/i }), '9876543210');

    await user.click(screen.getByRole('button', { name: /register student/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [, requestOptions] = global.fetch.mock.calls[0];
    const payload = JSON.parse(requestOptions.body);

    expect(payload.year).toBe(3);
    expect(payload.batch).toBe('Batch-1');
  });
});
