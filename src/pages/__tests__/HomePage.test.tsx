import { describe, it, expect, vi, beforeAll } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

// The real terminal needs react-terminal's context; a button stands in for `show bates`.
vi.mock('../../components/Terminal', () => ({
  default: ({ setProject, setContent }: { setProject: (p: string) => void; setContent: (c: string) => void }) => (
    <button
      type='button'
      onClick={() => {
        setContent('project');
        setProject('bates');
      }}
    >
      show bates
    </button>
  ),
}));
vi.mock('../../components/Project', () => ({
  default: ({ project }: { project: string }) => <p>project {project}</p>,
}));

// jsdom has <dialog> but not its modal methods.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
  };
});

const openProject = () => {
  render(<HomePage />);
  fireEvent.click(screen.getByRole('button', { name: 'show bates' }));
  const dialog = screen.getByLabelText('Project details', { selector: 'dialog' }) as HTMLDialogElement;
  expect(dialog.open).toBe(true);
  expect(screen.getByText('project bates')).toBeInTheDocument();
  return dialog;
};

describe('HomePage dialog', () => {
  it('closes on Escape, even though react-terminal swallows keys at the document', () => {
    const dialog = openProject();
    // What react-terminal does: cancel every key before anything else at the document sees it.
    const swallow = (e: KeyboardEvent) => e.preventDefault();
    document.addEventListener('keydown', swallow);
    act(() => {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    document.removeEventListener('keydown', swallow);
    expect(dialog.open).toBe(false);
    expect(screen.queryByText('project bates')).not.toBeInTheDocument();
  });

  it('ignores Escape when no dialog is open', () => {
    render(<HomePage />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(screen.getByRole('button', { name: 'show bates' })).toBeInTheDocument();
  });

  it('closes on a backdrop click but not on a click inside', () => {
    const dialog = openProject();
    fireEvent.click(screen.getByText('project bates'));
    expect(dialog.open).toBe(true);
    fireEvent.click(dialog);
    expect(dialog.open).toBe(false);
    expect(screen.queryByText('project bates')).not.toBeInTheDocument();
  });

  it("clears its state when the browser cancels it", () => {
    const dialog = openProject();
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(dialog.open).toBe(false);
  });

  it('still closes from the close button', () => {
    const dialog = openProject();
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(dialog.open).toBe(false);
  });
});
