import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(ko);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.extend(relativeTime);
