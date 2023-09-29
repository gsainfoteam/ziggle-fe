import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import ko from 'dayjs/locale/ko';

dayjs.extend(LocalizedFormat);
dayjs.locale(ko);
