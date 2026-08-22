import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from '../../components/notes/NoteCard';

const mockNote = {
  _id: '123',
  title: 'Test Note',
  content: '<p>This is test content</p>',
  createdAt: '2026-08-13T00:00:00.000Z',
};

describe('NoteCard', () => {
  it('should render note title correctly', () => {
    render(
      <NoteCard
        note={mockNote}
        index={0}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('should render note content without HTML tags', () => {
    render(
      <NoteCard
        note={mockNote}
        index={0}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });

  it('should show dropdown menu when three-dot button clicked', () => {
    render(
      <NoteCard
        note={mockNote}
        index={0}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('⋮'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should call onEdit when Edit is clicked', () => {
    const onEdit = jest.fn();
    render(
      <NoteCard
        note={mockNote}
        index={0}
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(mockNote);
  });

  it('should call onDelete when Delete is clicked', () => {
    const onDelete = jest.fn();
    render(
      <NoteCard
        note={mockNote}
        index={0}
        onEdit={jest.fn()}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('123');
  });
});