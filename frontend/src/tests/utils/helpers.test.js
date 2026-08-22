import { stripHtml, formatDate } from '../../components/notes/NoteCard';

describe('stripHtml', () => {
  it('should strip HTML tags and return plain text', () => {
    expect(stripHtml('<p>Hello World</p>')).toBe('Hello World');
  });

  it('should handle nested HTML tags', () => {
    expect(stripHtml('<h1><strong>Title</strong></h1>')).toBe('Title');
  });

  it('should return empty string for empty input', () => {
    expect(stripHtml('')).toBe('');
  });

  it('should handle plain text without tags', () => {
    expect(stripHtml('Plain text')).toBe('Plain text');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2026-08-13T00:00:00.000Z');
    expect(result).toMatch(/Aug/);
    expect(result).toMatch(/2026/);
  });

  it('should return a string', () => {
    const result = formatDate('2026-08-13T00:00:00.000Z');
    expect(typeof result).toBe('string');
  });
});