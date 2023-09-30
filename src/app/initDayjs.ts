import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);
dayjs.locale(ko);
