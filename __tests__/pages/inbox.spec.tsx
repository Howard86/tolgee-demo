import { appRender } from 'test-utils';

import InboxPage from '@/pages/inbox';

describe('inbox', () => {
  it('renders InboxPage', () => {
    expect.hasAssertions();
    appRender(<InboxPage />);

    expect(document.title).toBe('inbox-title');
  });
});
