import { render, fireEvent, screen } from '@testing-library/react';
import DefaultCard from './';

describe('<DefaultCard />', () => {
  let subject;

  const onCardRemove = jest.fn();

  const card = { id: 1, title: 'Card title', description: 'Description' };

  function mount(props) {
    subject = render(
      <DefaultCard onCardRemove={onCardRemove} {...props}>
        {card}
      </DefaultCard>
    );
    return subject;
  }

  function reset() {
    subject = undefined;
    onCardRemove.mockClear();
  }

  beforeEach(reset);

  it('renders a card with its title and its description', () => {
    mount();
    expect(screen.queryByText('Card title')).toBeVisible();
    expect(screen.queryByText('Description')).toBeVisible();
  });

  describe('about the style on dragging', () => {
    describe('when the component receives "dragging"', () => {
      beforeEach(() => mount({ dragging: true }));

      it('applies the gray background color to the card', () => {
        expect(subject.container.querySelector('div')).toHaveClass('react-kanban-card--dragging');
      });
    });

    describe('when the component does not receive "dragging"', () => {
      beforeEach(() => mount());

      it('does not apply the gray background color to the card', () => {
        expect(subject.container.querySelector('div')).not.toHaveClass('react-kanban-card--dragging');
      });
    });
  });

  describe('about the remove card button', () => {
    describe('when the component does not receive the "allowRemoveCard" prop', () => {
      beforeEach(() => mount({ onCardRemove }));

      it('does not show the remove button', () => {
        expect(screen.queryByText('×')).not.toBeInTheDocument();
      });

      it('does not call the "onCardRemove" callback', () => {
        expect(onCardRemove).not.toHaveBeenCalled();
      });
    });

    describe('when the component receives the "allowRemoveCard" prop', () => {
      beforeEach(() => mount({ allowRemoveCard: true }));

      it('shows the remove button', () => {
        expect(screen.getByText('×')).toBeInTheDocument();
      });

      it('does not call the "onCardRemove" callback', () => {
        expect(onCardRemove).not.toHaveBeenCalled();
      });

      describe('when the user clicks on the remove button', () => {
        beforeEach(() => fireEvent.click(screen.queryByText('×')));

        it('calls the "onCardRemove" callback passing the card', () => {
          expect(onCardRemove).toHaveBeenCalledTimes(1);
          expect(onCardRemove).toHaveBeenCalledWith(card);
        });
      });
    });
  });
});
