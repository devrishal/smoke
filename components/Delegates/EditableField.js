// EditableField.js
import React, { useState } from 'react';

function EditableField({ defaultValue, onSave }) {
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onSave(value);
    setEditing(false);
  };

  return editing ? (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div onClick={() => setEditing(true)}>{value || 'Click to edit'}</div>
  );
}

export default EditableField;
