import 'bootstrap/dist/css/bootstrap.css';
import ZAFClient from 'zendesk_app_framework_sdk';
import I18n from 'i18n';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

var client = ZAFClient.init();

client.on('app.registered', function(appData) {
  client.get('currentUser.locale').then(userData => {
    const locale = userData['currentUser.locale'];
    I18n.loadTranslations(locale);
    dayjs.locale(locale.split('-')[0]);
    let location = appData.context.location;
    let App = require(`./${location}.js`).default;
    new App(client, appData);
  });
});

client.on('app.willDestroy', function() {
  // to appease validation
});
