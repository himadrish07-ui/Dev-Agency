# Dev Agency Portfolio

A responsive portfolio website for a development team. It presents the agency's work, introduces team members, and provides a client contact form.

## Features

- Responsive Bootstrap navigation and page layout
- Light and dark themes with saved user preference
- Portfolio cards linking to five web applications
- Team member profiles with GitHub and LinkedIn links
- Contact form with client-side validation and PDF upload checks
- Mobile navigation and automatic copyright year

## Technologies

- HTML5
- CSS3 and custom properties
- Vanilla JavaScript
- Bootstrap 5.3
- Google Fonts

## Run Locally

Clone the repository:

```bash
git clone https://github.com/himadrish07-ui/Dev-Agency.git
cd Dev-Agency
```

Start a local static server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

You can also open `index.html` directly, but an internet connection is required for Bootstrap, Google Fonts, and externally hosted images.

## Project Structure

```text
Dev-Agency/
├── index.html   # Page content and structure
├── style.css    # Layout, components, and theme styles
├── script.js    # Theme switching and form validation
└── README.md    # Project documentation
```

## Theme Preference

The theme button in the navigation switches between light and dark modes. The selected mode is stored in the browser's `localStorage` and restored on the next visit.

## Contact Form

The contact form validates the user's name, email, project description, and PDF attachments in the browser. It currently demonstrates the interface only and does not send data to a server.

## License

No license has been specified for this project.
