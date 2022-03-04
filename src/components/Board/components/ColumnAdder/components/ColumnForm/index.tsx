import React, { useRef } from 'react';
import { when } from '@services/utils';

function ColumnForm({ onConfirm, onCancel }) {
  const inputColumnTitle = useRef<HTMLInputElement>(null);

  function addColumn(event) {
    event.preventDefault();

    when(inputColumnTitle.current.value)(onConfirm);
  }

  return (
    <div className='react-kanban-column' style={{ minWidth: '230px' }}>
      <form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={addColumn}>
        <input type='text' ref={inputColumnTitle} autoFocus />
        <button type='submit'>Add</button>
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ColumnForm;
