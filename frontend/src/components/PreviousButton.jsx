import React from 'react';
import { useNavigate } from 'react-router-dom';

function PreviousButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-ghost inline-flex items-center gap-2 mt-4"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Go Back
    </button>
  );
}

export default PreviousButton;
