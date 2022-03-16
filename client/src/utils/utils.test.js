import { formatDate } from './utils'

test('formatDate', () => {
    const date = '2022-01-01T18:00:00.000Z';

    expect(formatDate(date)).toMatch(/01\/0[1-2]\/2022/i);
});