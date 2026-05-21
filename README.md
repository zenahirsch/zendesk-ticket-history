# Ticket History

**Ticket History** is a custom Zendesk app that displays a user's recent tickets in the ticket sidebar, along with the status, creation date, and currently assigned user. Clicking on a particular ticket will open up a preview of the requester's original comment, and also allows the user to switch directly to that ticket in the agent interface.

## Installation

Installation is simple. Simply search for the Ticket History app in the [Zendesk Apps Directory](https://www.zendesk.com/apps/) and click Install.

## Screenshots


_Sidebar app_ | _Lightbox ticket preview_
:-----------: | :------------------------:
![](https://github.com/zenahirsch/zendesk-ticket-history/blob/master/dist/assets/screenshot-0.png) | ![](https://github.com/zenahirsch/zendesk-ticket-history/blob/master/dist/assets/screenshot-1.png)

## Configuration

_Setting_ | _Description_
--------- | -------------
List length | Changes the default number of tickets shown in the app
Show satisfaction ratings | When enabled, indicators will appear next to each ticket's subject line for good, bad, and/or unoffered satisfaction scores
Show preview | When enabled, clicking on a ticket in the app will open a modal with a preview of the ticket
Exclude archived tickets | When enabled, the app will not display archived tickets. Disabling this setting may reduce app performance

## Development

This app is built with Webpack and can be run locally with the Zendesk CLI.

Prerequisites:

- Node.js and npm
- Zendesk CLI (`zcli`)

Install dependencies:

```sh
npm install
```

Build the app into `dist`:

```sh
npm run build
```

Watch source files while developing:

```sh
npm run watch
```

After building, use the Zendesk CLI to serve the app locally from the generated `dist` directory:

```sh
zcli apps:server dist
```

## Contributing

Bug reports, fixes, and improvements are welcome. Please open an issue or submit a pull request.
