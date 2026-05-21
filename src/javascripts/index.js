import 'bootstrap/dist/css/bootstrap.css';
import ZAFClient from 'zendesk_app_framework_sdk';
import I18n from 'i18n';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Modal from './modal';
import TicketSidebar from './ticket_sidebar';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

var client = ZAFClient.init();
const APPS_BY_LOCATION = {
  modal: Modal,
  ticket_sidebar: TicketSidebar
};

client.on('app.registered', function(appData) {
  client.get('currentUser.locale').then(userData => {
    const locale = userData['currentUser.locale'];
    I18n.loadTranslations(locale);
    dayjs.locale(locale.split('-')[0]);
    let location = appData.context.location;
    let App = APPS_BY_LOCATION[location];

    if (!App) {
      throw new Error(`Unsupported app location: ${location}`);
    }

    new App(client, appData);
  });
});

client.on('app.willDestroy', function() {
  // to appease validation
});
