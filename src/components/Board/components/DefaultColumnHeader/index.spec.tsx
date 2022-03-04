import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DefaultColumnHeader from '.';

describe('<DefaultColumnHeader />', () => {
  let subject;

  const onColumnRemove = jest.fn();
  const onColumnRename = jest.fn();

  const column = { id: 1, title: 'Column title' };

  function reset() {
    subject = undefined;
    onColumnRemove.mockClear();
    onColumnRename.mockClear();
  }

  function mount(props) {
    subject = render(
      <DefaultColumnHeader onColumnRemove={onColumnRemove} onColumnRename={onColumnRename} {...props}>
        {column}
      </DefaultColumnHeader>
    );
    return subject;
  }

  beforeEach(reset);

  it('renders a column header with the title', () => {
    mount({});
    expect(screen.getByText('Column title')).toBeInTheDocument();
  });

  describe('about the remove column button', () => {
    describe('when the component does not receive the allowRemoveColumn prop', () => {
      beforeEach(() => mount({ onColumnRemove }));

      it('does not show the remove button', () => {
        expect(screen.queryByText('×')).not.toBeInTheDocument();
      });

      it('does not call the "onColumnRemove" callback', () => {
        expect(onColumnRemove).not.toHaveBeenCalled();
      });
    });

    describe('when the component receives the "allowRemoveColumn" prop', () => {
      beforeEach(() => mount({ allowRemoveColumn: true }));

      it('shows the remove button', () => {
        expect(screen.getByText('×')).toBeInTheDocument();
      });

      it('does not call the "onColumnRemove" callback', () => {
        expect(onColumnRemove).not.toHaveBeenCalled();
      });

      describe('when the user clicks on the remove button', () => {
        beforeEach(() => fireEvent.click(screen.queryByText('×')));

        it('calls the "onColumnRemove" callback passing the column', () => {
          expect(onColumnRemove).toHaveBeenCalledTimes(1);
          expect(onColumnRemove).toHaveBeenCalledWith(column);
        });
      });
    });
  });

  describe('about the column title renaming', () => {
    describe('when the component does not receive the "allowRenameColumn" prop', () => {
      beforeEach(() => mount({ onColumnRename }));

      describe('when the user moves the mouse over the title', () => {
        it('does not show a mouse pointer', () => {
          expect(screen.queryByText('Column title')).not.toHaveStyle({ cursor: 'pointer' });
        });
      });

      describe('when the user clicks on the column title', () => {
        beforeEach(() => fireEvent.click(screen.queryByText('Column title')));

        it('does not allow the user to rename the column', () => {
          expect(screen.getByText('Column title')).toBeInTheDocument();
          expect(subject.container.querySelector('input')).not.toBeInTheDocument();
        });

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the component receives the "allowRenameColumn" prop', () => {
      beforeEach(() => mount({ allowRenameColumn: true, onColumnRename }));

      describe('when the user moves the mouse over the title', () => {
        it('shows a mouse pointer', () => {
          expect(screen.queryByText('Column title')).toHaveStyle({ cursor: 'pointer' });
        });
      });

      describe('when the user clicks on the column title', () => {
        beforeEach(() => fireEvent.click(screen.queryByText('Column title')));

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled();
        });

        it('toggles the title for an input for typing a new title', () => {
          expect(screen.queryByText('Column title')).not.toBeInTheDocument();
          expect(subject.container.querySelector('input')).toBeInTheDocument();
          expect(screen.getByText('Rename', { selector: 'button' })).toBeInTheDocument();
          expect(screen.getByText('Cancel', { selector: 'button' })).toBeInTheDocument();
        });

        it('focuses on the input', () => {
          expect(subject.container.querySelector('input')).toHaveFocus();
        });

        it('fills the input with the column title', () => {
          expect(subject.container.querySelector('input')).toHaveValue('Column title');
        });

        describe('when the user types a new name and confirms it', () => {
          beforeEach(() => {
            fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } });
            fireEvent.click(screen.queryByText('Rename', { selector: 'button' }));
          });

          it('toggles the input for the column title', () => {
            expect(screen.getByText('Column title')).toBeInTheDocument();
            expect(subject.container.querySelector('input')).not.toBeInTheDocument();
          });

          it('calls the "onColumnRename" callback passing the column with the new title', () => {
            expect(onColumnRename).toHaveBeenCalledTimes(1);
            expect(onColumnRename).toHaveBeenCalledWith(column, 'New title');
          });
        });

        describe('when the user cancels the renaming', () => {
          beforeEach(() => {
            fireEvent.click(screen.queryByText('Cancel', { selector: 'button' }));
          });

          it('toggles the input for the column title', () => {
            expect(screen.getByText('Column title')).toBeInTheDocument();
            expect(subject.container.querySelector('input')).not.toBeInTheDocument();
          });

          it('does call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
