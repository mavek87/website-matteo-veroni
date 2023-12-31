This is the source code of my personal website (Matteo Veroni)

### Status of the last deploy:

[![Netlify Status](https://api.netlify.com/api/v1/badges/0b57d60e-9688-4889-a665-c538a0aecff9/deploy-status)](https://app.netlify.com/sites/matteoveroni/deploys)

### Structure of the project:

- All the source code can be found in the **src** folder.
- The minified and optimized code to be used in production is produced by webpack inside the **dist** folder.

### How to use the project:

- After cloning the project run ```npm install```
- To build the project into the **dist** folder run the command ```npm run build```

### How to deploy:

- **Manual Deployment (Deprecated)**
  - Run ```npm run build``` to get the updated contents in the **dist** folder and upload it manually.
- **Automatic Deplopyment**
  - Just push on **main** branch in **github** and the pipeline setup in **netlify** will do the rest (build and deploy).

### Services used in production

- https://www.namecheap.com/ - for the domain (www.matteoveroni.com)
- https://www.netlify.com/ - to host the website and handle the auto deploy procedure

### Other useful material:

- How to setup webpack: https://www.youtube.com/watch?v=HNb6bapmsyI
- Chatgpt for translations
- A Hassle-Free Way to Self-Host Google Fonts https://gwfh.mranftl.com/fonts
- mailto tips and tricks: https://stackoverflow.com/questions/4782068/can-i-set-subject-content-of-email-using-mailto
- netlify with cloudflare as dns: https://stevepolito.design/blog/configure-cloudflare-dns-to-work-with-netlify
- css load async: https://www.holisticseo.digital/pagespeed/async-css/
- css load async: https://stackoverflow.com/questions/32759272/how-to-load-css-asynchronously
- reduces images: https://www.reduceimages.com/
- responsive images: https://medium.com/@woutervanderzee/responsive-images-with-srcset-and-sizes-fc434845e948
- responsive image: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images?retiredLocale=it
- pdf compressor online: https://www.adobe.com/acrobat/online/compress-pdf.html

### To test the performance:

- https://gtmetrix.com/
- https://pagespeed.web.dev/