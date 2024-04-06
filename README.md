# rtk0c's fork of Nginx-Fancyindex-Theme

A responsive theme for [Nginx](https://www.nginx.org/)'s [Fancyindex module](https://github.com/aperezdc/ngx-fancyindex). Includes a fragment of `nginx.conf` that sets up the theme for the directory listing pages, and loading of a per-directory page footer.

This is modified from upstream to be:
1. Keeping the footer functionality without needing client-side Javascript to fetch a separate markdown file and rendering it. Instead, Fancyindex should be configured to directly load a HTML file as the footer.
  - The side effect is that if this HTML file is not created, Nginx will output a 404 page and that becomes the footer instead.
2. If the client has Javascript enabled...
  - A search form for the current directory level.
3. No distinct light/dark theme setup. Instead, everything is controlled by CSS media queries.

The fancyindex module can be found [here](https://github.com/aperezdc/ngx-fancyindex) (by @aperezdc).

## Usage

1. Make sure you have the fancyindex module installed. See the nginx documentation, or you respective operating system's package manage documentation if they provide such a package. Some notes:
  - Some Linux distros ship Nginx builds with Fancyindex compiled to it. In this case, probably install that directly.
  - Some ship Fancyindex as a dynamic module. In this case, install that _and then_ call `load_module /path/to/your/nginx_mod_fancyindex.so` in your `nginx.conf`.
2. Modify `nginx.conf` per [[Nginx Configuration]]
3. Move the contents of the `static/` folder to the root of the site directory. The code below assumes that the contents resides in `/.fancyindex/`.
4. Create `README.html` files under each directory as needed. These will show up on the bottom of the respective directory listing page. Apply the CSS class `.readme` to a wrapper element around the content to theme tags insde like `<b>`, `<code>`, `<h1>`. See the relevant section in [styles.css](/static/styles.css) for details.

### Nginx Configuration

A standard config looks something like this (use `-light` for the default light theme, or `-dark` for a dark theme):

```bash
location / {
  # Root of the site directory; change to your own
  root /path/to/your/files;

  fancyindex on;
  fancyindex_localtime on;
  fancyindex_exact_size off;
  fancyindex_css_href /.fancyindex/styles.css;
  fancyindex_header /.fancyindex/header.html;
  # Specify footer relative to the current directory, e.g. /path/to/ will display /path/to/README.html on the bottom
  fancyindex_footer README.html;
  # Ignore the fancyindex content files
  fancyindex_ignore "README.html";
  fancyindex_ignore ".fancyindex";
}

# If Fancyindex requests a directory that doesn't have a README.html, just return a default one rather than the 404 page
location ~ ^.*README.html$ {
  try_files $uri /.fancyindex/defaultFooter.html;
}
```
