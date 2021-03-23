import { render, screen } from '@testing-library/react';
import App from './ServiceList';
import ServiceList from "./ServiceList";

test('renders learn react link', () => {
    render(<ServiceList />);
    const linkElement = screen.getByText(/Add new service/i);
    expect(linkElement).toBeInTheDocument();
});
