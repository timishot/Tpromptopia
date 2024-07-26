import React, { Suspense } from 'react';
import EditPrompt from '@components/EditPrompt';

function UpdatePromptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}

export default UpdatePromptPage;